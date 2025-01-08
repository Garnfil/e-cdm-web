"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import jsCookie from 'js-cookie';
import { toast } from 'react-toastify';
import { formatDate } from "date-fns";
import Image from 'next/image';
// import placeholderAvatar from '@/public/'

const DiscussionDetails = () => {
    const params = useParams();
    const { discussion_id } = params;
    const [authSession, setAuthSession] = useState({});
    const [discussion, setDiscussion] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let session = jsCookie.get("session") ? JSON.parse(jsCookie.get("session")) : {};
        setAuthSession(session);
        fetchDiscussionDetails(session, discussion_id);
    }, [discussion_id]);

    const fetchDiscussionDetails = async (session, discussion_id) => {
        try {
            const response = await axios.get(`http://192.168.100.110:8000/api/discussions/${discussion_id}`, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${session?.token}`,
                }
            });
            console.log(response);


            setDiscussion(response.data.discussion);
            setComments(response.data.discussion.comments);
            setLoading(false);
        } catch (error) {
            toast.error(error.message ?? "Server Error");
        }

    }

    const handleAddComment = () => {

        const body = {
            comment: newComment,
            user_id: authSession.user.id, // Replace with actual user ID
            user_type: authSession.user.role, // Replace with actual user type
        };

        axios.post(`http://192.168.100.110:8000/api/discussions/${discussion_id}/comments`, body, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${authSession?.token}`,
            }
        }).then(response => {
            fetchDiscussionDetails(authSession);
            setNewComment('');
        }).catch(e => {
            setNewComment('');
            toast.error(e.message ?? "Server Error");
        });
    };

    const handleVote = (voteType) => {
        const body = {
            vote_type: voteType,
            user_id: authSession.user.id, // Replace with actual user ID
            user_type: authSession.user.role, // Replace with actual user type
        };

        axios.post(`http://192.168.100.110:8000/api/discussions/${discussion_id}/votes`, body, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${authSession?.token}`,
            }
        }).then(response => {
            console.log(response.data);
            fetchDiscussionDetails(authSession);
        }).catch(e => {
            toast.error(e.message ?? "Server Error");
        });
    };

    const handleNewCommentChange = (e) => {
        const value = e.target.value;
        setNewComment(value);
    }

    if (loading) return <p>Loading...</p>;

    return (
        <div className='max-width-container py-4'>
            <div className="max-w-full mx-auto mt-8 p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
                {/* Discussion Header */}
                <div className="flex items-center space-x-4">
                    <Image src="/placeholder-avatar.png" alt="Profile" className="w-10 h-10 rounded-full" />
                    <div>
                        <h2 className="text-lg font-semibold">{discussion.title}</h2>
                        <p className="text-sm text-gray-500">
                            {discussion.user.username} • {new Date(discussion.created_at).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                {/* Discussion Content */}
                <p className="mt-4 text-gray-700">
                    {discussion.content}
                </p>

                {/* Votes and Comments Summary */}
                <div className="flex items-center mt-4 space-x-4">
                    <div className="flex items-center border border-gray space-x-1 rounded px-3 py-1">
                        <button className="text-red-500 hover:text-red-700" onClick={() => handleVote('upvote')}>
                            <i className={`${discussion.user_has_vote && discussion.user_vote_type == 'upvote' ? 'bi bi-hand-thumbs-up-fill' : 'bi bi-hand-thumbs-up'}`}></i>
                        </button>
                        <span>{discussion.upvotes_count ?? 0}</span>
                    </div>
                    <div className="flex items-center border border-gray space-x-1 rounded px-3 py-1">
                        <button className="text-red-500 hover:text-red-700" onClick={() => handleVote('downvote')}>
                            <i className={`${discussion.user_has_vote && discussion.user_vote_type == 'downvote' ? 'bi bi-hand-thumbs-up-fill' : 'bi bi-hand-thumbs-up'}`}></i>
                        </button>
                        <span>{discussion.downvotes_count ?? 0}</span>
                    </div>
                    <div className="flex items-center border border-gray space-x-1 rounded px-3 py-1">
                        <i className="bi bi-chat-fill"></i>
                        <span>{comments.length}</span>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Comments</h3>
                    <div className='form-group my-2'>
                        <textarea className='form-control' rows={10} cols={10} style={{ height: '100px' }} value={newComment} onChange={handleNewCommentChange}></textarea>
                        <div className='flex justify-end'>
                            <button onClick={handleAddComment} className='btn btn-primary'>Add Comment</button>
                        </div>
                    </div>

                    {comments.map((comment) => (
                        <div key={comment.id} className="border-t border-gray-200 pt-4 pb-2">
                            <div className="flex items-center space-x-4">
                                <img src="/placeholder-avatar.png" alt="Profile" className="w-8 h-8 rounded-full" />
                                <div>
                                    <p className="font-semibold">{comment.user.firstname} {comment.user.lastname}</p>
                                    <p className="text-sm text-gray-500">
                                        {formatDate(new Date(comment?.created_at), 'MMM dd, yyyy hh:m a')}
                                    </p>
                                </div>
                            </div>
                            <p className="mt-2 text-gray-700">{comment.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default DiscussionDetails;
