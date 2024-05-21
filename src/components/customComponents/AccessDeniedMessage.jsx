const AccessDeniedMessage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="access-denied text-center text-red-500">
                <h1 className="text-xl font-bold">Access Denied !</h1>
                <p className="mt-4">This website is not accessible on mobile devices. Please use a desktop browser.</p>
            </div>
        </div>

    );
};

export default AccessDeniedMessage;
