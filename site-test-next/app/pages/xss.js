import MonFormulaireXSS from "../components/form_xss";
import RootLayout from "@/components/layout";

const xss = () => {
    return (
        <RootLayout>
            <h1>XSS Page</h1>
            <MonFormulaireXSS/>
        </RootLayout>
    )
}

export default xss;