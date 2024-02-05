
const config_function = () => {
    let config = {
        apiKey: 'YOUR_DEFAULT_API_KEY',
        apiUrl: 'https://api.example.com'
    };
    return (
        <div>
            <p>API Key: {config.apiKey}</p>
            <p>API URL: {config.apiUrl}</p>
        </div>
    );
}

export default config_function;