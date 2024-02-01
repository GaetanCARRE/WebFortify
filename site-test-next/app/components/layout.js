import Image from 'next/image';
import logo from '../public/logo.png'
import Link from 'next/link';

export default function RootLayout({ children }) {
    return (
        <div style={{ textAlign: "center" }}>
            <Image
                src={logo}
                alt="Company Logo"
                style={{ margin: '0 auto', width: 'auto', height: 'auto' }}
            />
            <nav>
                <Link href="/"><button>Home</button></Link>
                <Link href="/brute-force"><button>Brute force</button></Link>
                <Link href="/sql-injection"><button>SQL Injection</button></Link>
                <Link href="/xss"><button>xss</button></Link>
                <Link href="/file_upload"><button>File Upload</button></Link>
            </nav>
            <div>{children}</div>
        </div>
    );
}
