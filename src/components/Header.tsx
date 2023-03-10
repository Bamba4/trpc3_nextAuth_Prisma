import { signIn, signOut, useSession } from "next-auth/react";

export const Header = () => {
    const { data: sessionData } = useSession()
    
    return (
        <div className="navbar bg-primary tect-primary-content">
                <div className="flex-1 pl-5 text-3xl font-bold">
                    {sessionData?.user.name ? `Note for ${sessionData.user.name}` : ""}
                </div>
                <div className="flex-none gap-2">
                    <div className="dropdown-end dropdown">
                        {sessionData?.user ?  
                            <label
                                tabIndex={0}
                                className="btn-ghost btn-circle avatar btn"
                                onClick={() => void signOut}
                            >
                                <div className="flex justify-end w-10 rounded-full">
                                    <img src={sessionData?.user?.image ?? ""}
                                        alt={sessionData?.user?.name ?? ""}
                                    />
                                </div>
                            </label>
                            
                            : (
                                <button className="btn-ghost rouded-btn btn" onClick={()=> void signIn()}>Sign In</button>
                        )}
                    </div>
                   
                </div>
               
        </div>
    )
}