import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Reactivate = ({ data }) => {

    const navigate = useNavigate();

    const [loading, setLoading] = React.useState(false);
    const [status, setStatus] = React.useState(false);

    const handleReactive = async () => {
        setLoading(true);

        try {
            const res = await axios.put("http://localhost:8080/profile-service/profile/reactivate-account",
                { userID: data.userID, status: status || true }
            )

            if (res.status === 200) {
                alert(res.data.message);
                navigate("/main/feed");
                setStatus(false);
                setLoading(false);
                localStorage.setItem("Token", data.Token);
                localStorage.setItem("UserID", data.userID);
            }
        } catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            <div
                className="absolute inset-0 bg-black/80"
            // onClick={onClose}
            />

            <div className="relative z-10 w-[620px] p-12 rounded-xl bg-white text-black border border-white/20 ">

                <h2 className="text-2xl font-bold text-black text-center">
                    Account Deactivated
                </h2>

                <p className="text-black-200 text-center mt-3">
                    Your account is currently deactivated.
                </p>

                {data.deactiveUntill && (
                    <p className="text-sm text-black-300 text-center mt-2">
                        Reactivation Date:{" "}
                        <b>{new Date(data.deactiveUntill).toLocaleString()}</b>
                    </p>
                )}

                {data.deactivateReason && (
                    <p className="text-sm text-black-300 text-center mt-2">
                        Reason:{" "}
                        <b>{data.deactivateReason}</b>
                    </p>
                )}

                <p className="text-black-300 text-center mt-4">
                    You can reactivate your account right now if you want to continue.
                </p>

                <div className="flex justify-center gap-4 mt-6">
                    <button
                        // onClick={onClose}
                        className="px-6 py-2 rounded bg-gray-500/70 text-black hover:bg-gray-600 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => { handleReactive(), setStatus(true) }}
                        className="px-6 py-2 rounded bg-green-600 text-black hover:bg-green-700 transition cursor-pointer"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Reactivating...
                            </span>
                        ) : (
                            'Reactivate'
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Reactivate;
