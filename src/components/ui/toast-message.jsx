

const ToastMessage = ({message, type}) => {
    return (
        <div className="toast toast-top toast-end">
            <div className={`
                 alert ${type == "success" && "alert-success"} 
                       ${type == "error" && "alert-error"} 
                       ${type == "warning" && "alert-warning"}
                       `}>
                <span>{message}</span>
            </div>
        </div>
    )
}

export default ToastMessage