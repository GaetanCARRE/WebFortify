def concatener_et_supprimer_doublons():
    # Noms des fichiers d'entrée
    fichiers_entree = ["wordlist_common.txt", "wordlist_dssstore.txt", "wordlist_french.txt"]

    # Nom du fichier de sortie
    fichier_sortie = "wordlist.txt"

    # Liste pour stocker tous les mots
    tous_les_mots = set()

    # Concaténer les fichiers
    for fichier in fichiers_entree:
        with open(fichier, 'r', encoding='utf-8') as f:
            mots = set(f.read().splitlines())
            tous_les_mots.update(mots)

    # Écrire la liste sans doublons dans le fichier de sortie
    with open(fichier_sortie, 'w', encoding='utf-8') as f_out:
        for mot in tous_les_mots:
            f_out.write(f"{mot}\n")
            
concatener_et_supprimer_doublons()