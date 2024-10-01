"use client"
import { useRef, useState, useEffect } from "react";
import Pusher from "pusher-js";

const Whiteboard = (props) => {
    const { session_id } = props;
    const canvasRef = useRef(null);
    const isThrottled = useRef(false); // Ref to manage throttling state
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState("#000000");
    const [count, setCount] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.lineCap = "round";  // Smooth lines
        context.lineWidth = 5;      // Line thickness
    }, [session_id]);

    const pusher = new Pusher('dcb5e22ff8f02d72a547', {
        cluster: 'ap1',
    });

    const channel = pusher.subscribe(`whiteboard.${session_id}`); // Use sessionId in the public channel name

    channel.bind('my-event', (data) => {
        console.log(data);
        drawFromServer(data);
    });

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        context.strokeStyle = color; // Set the color for the stroke
        context.beginPath();
        context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        context.stroke();

        console.log(count);
    };


    const stopDrawing = (e) => {
        setIsDrawing(false);
        // Throttle the whiteboard updates
        if (!isThrottled.current) {
            setCount(() => count + 1);
            isThrottled.current = true;
            setTimeout(() => {
                sendWhiteboardUpdate({
                    x: e.nativeEvent.offsetX,
                    y: e.nativeEvent.offsetY,
                    color,
                });
                isThrottled.current = false;
            }, 2000); // Throttling time in milliseconds
        }
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const sendWhiteboardUpdate = async (data) => {
        await fetch(`http://localhost:8000/api/whiteboard/update/${session_id}`, { // Update with your Laravel API endpoint
            method: 'POST',
            body: JSON.stringify({ data }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

    const drawFromServer = (data) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.strokeStyle = data.color;
        context.lineTo(data.x, data.y);
        context.stroke();
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            {/* Title */}
            <h1 className="text-2xl font-bold mb-4 text-gray-700">Interactive Whiteboard</h1>

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-4 w-full max-w-lg space-x-4">
                <div className="flex items-center space-x-2">
                    <label htmlFor="colorPicker" className="text-gray-600 font-semibold">Line Color:</label>
                    <input
                        type="color"
                        id="colorPicker"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="border border-gray-300 rounded-md p-1 cursor-pointer"
                    />
                </div>

                {/* Clear Button */}
                <button
                    onClick={clearCanvas}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
                >
                    Clear
                </button>
            </div>

            {/* Canvas */}
            <div className="border-4 border-gray-300 shadow-lg rounded-lg">
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={600}
                    className="bg-white rounded-lg"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                />
            </div>
        </div>
    );
};

export default Whiteboard;
