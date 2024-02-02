import multer from 'multer';

// Configurer multer
const upload = multer({
    dest: 'public/uploads/', // Le dossier où les fichiers téléchargés seront sauvegardés
});

// Gérer l'upload de fichier
export const config = {
    api: {
        bodyParser: false, // Désactiver le bodyParser intégré de Next.js
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Utiliser multer pour traiter la demande d'upload
        upload.single('file')(req, res, (err) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            // Le fichier a été téléchargé avec succès
            return res.status(200).json({ message: 'File uploaded successfully' });
        });
    } else {
        // Méthode non autorisée
        res.status(405).end();
    }
}