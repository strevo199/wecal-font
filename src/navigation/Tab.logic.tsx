import { Dispatch, SetStateAction } from "react";

export const handleSearchAction = (settoggleSearch: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; },toggle: boolean) => {
    settoggleSearch(!toggle);
}