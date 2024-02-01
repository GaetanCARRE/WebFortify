import MonFormulaireUpload from "../components/form_upload_fichier";
import RootLayout from '../components/layout'

const file_upload = () => {
    return (
        <RootLayout>
            <h1>Upload file Page</h1>
            <MonFormulaireUpload />
        </RootLayout>
    );
}

export default file_upload