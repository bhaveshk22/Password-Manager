import React, { useEffect } from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

const Manager = () => {

    const [showPassword, setshowPassword] = useState(false)
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getPassword = async () => {
        const req = await fetch('http://localhost:3000/')
        const passwords = await req.json()
        setpasswordArray(passwords)
    }

    useEffect(() => {
        getPassword()
    }, [])

    const showPasswordToggler = () => {
        setshowPassword(prev => !prev);
    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            if (form.id) {
                await fetch('http://localhost:3000', {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ id: form.id })
                })
            }
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);

            await fetch('http://localhost:3000/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...form, id: uuidv4() })
            })

            toast.success('Saved Successfully', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setform({ site: "", username: "", password: "" })
        }
        else {
            toast.error('Error in Saving', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
        toast.info(`Copied to Clipboard`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const editPassword = (id) => {
        setform({ ...passwordArray.filter(item => item.id === id)[0], id: id })
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const deletePassword = async (id) => {
        let c = confirm('Do you really want to delete this password?')
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            await fetch('http://localhost:3000', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id })
            })

            toast.success(`Password deleted Successfully`, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="fixed inset-0 -z-10 min-h-full w-full bg-blue-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]"></div></div>

            <div className='relative inline-flex flex-col ml-[25vw] h-auto text-center mt-5 w-[50vw]'>
                <div className='mt-3'>
                    <span className='mt-3 font-bold text-4xl text-green-400'>&lt;</span>
                    <span className='mt-3 font-bold text-4xl text-black'>Pass</span>
                    <span className='mt-3 font-bold text-4xl text-green-400'>OP/&gt;</span>
                </div>
                <div>Your Own Password Manager</div>
                <div className='mt-5 inline-flex p-0'>
                    <input value={form.site} onChange={handleChange} className="text_box m-0 w-full" placeholder='Website URL' type="text" name='site' />
                </div>
                <div className='mt-7 flex flex-col md:flex-row gap-8 w-full'>
                    <input value={form.username} onChange={handleChange} className="text_box w-full" placeholder="Username" type="text" name='username' />
                    <div className='relative flex items-center w-full'>
                        <input value={form.password} onChange={handleChange} className="text_box pr-6 w-full" placeholder="Password" type={showPassword ? 'text' : 'password'} name='password' />
                        <img onClick={showPasswordToggler} className='w-4 absolute right-2 cursor-pointer' src={showPassword ? "icons/eyecross.png" : "icons/eye.png"} alt="view" />
                    </div>
                </div>
                <div className='mt-8 flex item-center justify-center'>
                    <button onClick={savePassword} className='bg-green-400 px-3 py-1 rounded-xl border-1 border-black cursor-pointer hover:bg-green-500 flex item-center gap-1'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" >
                        </lord-icon>Save Password</button>
                </div>

            </div>
            <div className='md:mx-[20vw] md:w-[60vw] mt-5 mb-3'>

                <h2 className='font-bold text-xl'>Your Passwords</h2>
                {passwordArray.length === 0 && <div className='mt-5 text-center'>No passwords to show :(</div>}
                {passwordArray.length != 0 &&
                    <table className='mt-5 w-full table-auto rounded-md overflow-hidden'>
                        <thead className='border text-center bg-blue-800 text-white'>
                            <tr>
                                <th>Site</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-center bg-blue-100'>
                            {passwordArray.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <a href={`https://${item.site}`} target='_blank' rel='noopener noreferrer'>{item.site}</a>
                                            <div className='inline cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </td>
                                        <td>
                                            {item.username}
                                            <div className='inline cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </td>
                                        <td>
                                            {"*".repeat(item.password.length)}
                                            <div className='inline cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='inline cursor-pointer mr-2' onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </div>
                                            <div className='inline cursor-pointer' onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                }
            </div>


        </div>
    )
}

export default Manager
