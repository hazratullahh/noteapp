import formButton from "./FormButton";

const DeleteModal = ({ onClose, showModal, deleteHandler }) => {

    return (
        <div
            id="popup-modal"
            tabIndex="-1"
            className={`fixed top-0 left-0 w-full h-full flex justify-center items-center z-40 ${showModal ? '' : 'hidden'
                }`}
        >
            <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
            <div className="relative bg-white rounded-lg shadow-lg p-4 md:p-5">
                <div className="text-center">
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete?
                    </h3>

                    <formButton data_modal="popup-modal" size="sm" variant="text" type="button" className="text-white cursor-pointer bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2" onClick={deleteHandler} >
                        Yes, I am sure
                    </formButton>

                    <button
                        data-modal-hide="popup-modal"
                        type="button"
                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        onClick={onClose}
                    >
                        No, cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
