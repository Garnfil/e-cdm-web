"use client"

import React, { useRef, useState, useEffect } from 'react';
import Pusher from 'pusher-js';
import { useParams } from 'next/navigation';

const Whiteboard = () => {
    const params = useParams();
    const { session_id } = params;
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const isDrawingRef = useRef(false);
    const [tool, setTool] = useState("pencil");


    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return; // Exit if canvas is not yet rendered

        const ctx = canvas.getContext('2d');
        ctx.lineCap = 'round';
        ctx.lineWidth = 5;
        contextRef.current = ctx; // Set contextRef to the canvas context

        // Initialize Pusher for real-time communication
        const pusher = new Pusher('dcb5e22ff8f02d72a547', {
            cluster: 'ap1',
        });
        const channel = pusher.subscribe(`whiteboard.${session_id}`);

        // Listen for updates from other users
        channel.bind('whiteboard-updated', (data) => {
            drawFromPusher(data); // Draw shapes based on received data
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
            pusher.disconnect();
        };
    }, [session_id]);

    // Function to draw based on incoming data from Pusher
    const drawFromPusher = (data) => {
        const ctx = contextRef.current; // Use the ref to access context
        if (!ctx) return;

        console.log(ctx, data);

        const { x, y, color, type } = data;
        ctx.strokeStyle = color;

        if (type === 'start') {
            ctx.beginPath();
            ctx.moveTo(x, y);
        } else if (type === 'draw') {
            ctx.lineTo(x, y);
            ctx.stroke();
        } else if (type === 'stop') {
            ctx.closePath();
        }
    };

    const startDrawing = (event) => {
        event.preventDefault();
        const { offsetX, offsetY } = event.nativeEvent;
        isDrawingRef.current = true;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);

        // broadcastUpdate(offsetX, offsetY, 'start');
    };

    const draw = (event) => {
        event.preventDefault();
        if (!isDrawingRef.current) return;

        const { offsetX, offsetY } = event.nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();

        // broadcastUpdate(offsetX, offsetY, 'draw');
    };

    const stopDrawing = (event) => {
        event.preventDefault();
        if (!isDrawingRef.current) return;

        isDrawingRef.current = false;
        contextRef.current.closePath();

        // broadcastUpdate(0, 0, 'stop');
    };

    // Broadcast data to Laravel backend
    const broadcastUpdate = (x, y, type) => {
        fetch(`https://e-learn.godesqsites.com/api/whiteboard/update/${session_id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ x, y, type, color: '#000000' }), // You can adjust color or other properties here
        });
    };

    return (
        <div className='w-full '>
            <div className='flex justify-center items-center flex-col gap-7'>
                <div className='w-full flex justify-between items-start gap-3'>
                    <div className='px-4 py-5 border-2 border-black w-[50%]'>
                        <div className='flex justify-between items-center'>
                            <div>
                                <h3 className='text-2xl font-bold'>Session: <span></span></h3>
                                <h4 className='text-lg'>Total Users Joined: <span></span></h4>
                            </div>

                            <button className='btn bg-red-800 text-white'><i class="bi bi-box-arrow-left"></i> Leave Session </button>
                        </div>
                    </div>
                    <div className='w-[50%] border-2 border-black p-4'>
                        <div class="relative flex flex-col justify-center items-center gap-2">
                            <div className='inline-flex gap-4'>
                                <div class="flex flex-nowrap flex-row gap-3 items-center mb-2">
                                    <input class="form-checkbox h-5 w-5 accent-lime-600 focus:outline-none rounded-full" type="radio" name="tool" id="tool-pencil" value="pencil" checked={tool == 'pencil'} onChange={(e) => setTool(e.target.value)} />
                                    <label class="inline-block" for="tool-pencil">
                                        Pencil
                                    </label>
                                </div>
                                <div class="flex flex-nowrap flex-row gap-3 items-center mb-2">
                                    <input class="form-checkbox h-5 w-5 accent-lime-600 focus:outline-none rounded-full" type="radio" name="tool" id="tool-line" value="line" checked={tool == 'line'} onChange={(e) => setTool(e.target.value)} />
                                    <label class="inline-block" for="tool-line">
                                        Line
                                    </label>
                                </div>
                                <div class="flex flex-nowrap flex-row gap-3 items-center mb-2">
                                    <input class="form-checkbox h-5 w-5 accent-lime-600 focus:outline-none rounded-full" type="radio" name="tool" id="tool-rectangle" value="rectangle" checked={tool == 'rectangle'} onChange={(e) => setTool(e.target.value)} />
                                    <label class="inline-block" for="tool-rectangle">
                                        Rectangle
                                    </label>
                                </div>
                            </div>
                            <div className='w-full'>
                                <input type='color' className='w-[100%]' value={'#0b4c11'} />
                            </div>
                            <div className='btn-group gap-2 flex'>
                                <button className='btn btn-primary'>Undo</button>
                                <button className='btn btn-primary'>Redo</button>
                                <button className='btn bg-red-500 text-white'>Clear Canvas</button>
                            </div>
                        </div>
                    </div>
                </div>

                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    width={1000}
                    height={700}
                    style={{ border: '1px solid black' }}
                />
            </div>

        </div>

    );
};

export default Whiteboard;
