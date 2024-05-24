export interface Branch {
    branchName: string;
    branchAddress: string;
    branchLatitude: number;
    branchLongitude: number;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    branchName: string;
    branchAddress: string;
}