import RootLayout from "@/components/layout";
import SQLInjectionForm from "../components/form_sql_injection";

const sql_injection = () => {

    return (
        <RootLayout>
            <h1>SQL injection Page</h1>
            <SQLInjectionForm />
        </RootLayout>
    );
};

export default sql_injection;