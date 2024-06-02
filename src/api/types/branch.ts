/* eslint-disable no-unused-vars */
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

export interface MapSearchBarProps {
    onFocus: () => void;
    onChange: (value: string) => void
}

export interface MapSearchResultProps {
    onClose: () => void;
    results: Branch[];
    onMarkerClick: (branch: Branch) => void; 
    currentLatitude: number; 
    currentLongitude: number;
}

export interface OfficeInfoProps {
    branchName: string;
    branchAddress: string;
}

export interface SelectedBranch {
    branchName: string;
    branchAddress: string;
    branchLatitude: number;
    branchLongitude: number;
    branchPhoneNumber: string;
    roadFromStation: string;
    stationToBranch: string[];
}
  