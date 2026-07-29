/* ===== DIAGNOSTICA (registro errori visibile dal telefono) ===== */
window.__LOG__=[];
/* ===== SISTEMA TRADUZIONE IT/EN ===== */
const I18N={
  // navigazione e sezioni
  'Archivio':'Archive','Crea nuovo':'Create new','Attività':'Activity','Altro':'More',
  'Opere':'Artworks','Biblioteca Pro':'Pro Library','PDF Studio':'PDF Studio','Impostazioni':'Settings',
  'Informazioni':'About','Timeline':'Timeline','Workspace':'Workspace','Mostre':'Exhibitions',
  'Clienti':'Clients','Vendite':'Sales','Agenda':'Agenda','Certificati':'Certificates',
  'Zona Social':'Social','Link utili':'Useful links','Curatori e critici':'Curators & critics',
  'Gallerie':'Galleries','Certificato':'Certificate','Guida offline':'Offline guide',
  'Contatti e segnalazioni':'Contact & feedback',
  'Il tuo atelier digitale':'Your digital atelier',
  'Il tuo archivio artistico':'Your art archive',
  'Organizza e gestisci le tue opere artistiche, con immagini, schede, prezzi e stato.':'Organize and manage your artworks, with images, records, prices and status.',
  'I tuoi clienti, sempre a portata di mano':'Your clients, always at hand',
  'Gestisci collezionisti, galleristi, contatti, preferenze e storico degli acquisti.':'Manage collectors, gallerists, contacts, preferences and purchase history.',
  'Tieni sotto controllo le vendite':'Keep your sales under control',
  'Registra trattative, incassi, pagamenti e ricevute in un unico spazio.':'Record deals, income, payments and receipts in one place.',
  'Organizza il tuo tempo':'Organize your time',
  'Pianifica appuntamenti, mostre, consegne, scadenze e promemoria.':'Schedule appointments, exhibitions, deliveries, deadlines and reminders.',
  // pulsanti e azioni comuni
  'Salva':'Save','Annulla':'Cancel','Elimina':'Delete','Modifica':'Edit','Chiudi':'Close',
  'Cerca':'Search','Aggiungi':'Add','Nuovo':'New','Esporta':'Export','Importa':'Import',
  'Indietro':'Back','Avanti':'Next','Conferma':'Confirm','Scarica':'Download','Condividi':'Share',
  'Esci':'Exit','Apri':'Open','Crea':'Create','Adatta':'Fit','Testo':'Text','Pagine':'Pages',
  // home / sezioni titoli comuni
  'Da fare':'To do','In ritardo':'Overdue','Oggi':'Today','Domani':'Tomorrow','Prossimi giorni':'Coming days',
  'Personalizza':'Customize','Apri agenda':'Open agenda','Carica altre':'Load more',
  'Nessun risultato.':'No results.','Nessun elemento.':'No items.',
  // impostazioni
  'Aspetto':'Appearance','Sicurezza':'Security','Profilo':'Profile','Liste':'Lists','Backup':'Backup',
  'Tema dell\u2019app':'App theme','Dimensione caratteri':'Font size','Piccola':'Small','Media':'Medium','Grande':'Large',
  'Lingua':'Language','Italiano':'Italian','Inglese':'English',
  'Salva aspetto':'Save appearance','Salva profilo':'Save profile','Salva sicurezza':'Save security',
  'Nome artista / atelier':'Artist / atelier name','Biografia':'Biography','Email':'Email','Telefono':'Phone',
  'Diagnostica':'Diagnostics','Apri diagnostica':'Open diagnostics',
  'Chiudi applicazione':'Close application','Esci dall\u2019app':'Exit app',
  'Sostieni il progetto':'Support the project','Dona con PayPal':'Donate with PayPal',
  'Impaginazione PDF':'PDF layout','Configura impaginazione':'Configure layout',
  // --- HOME ---
  'Gestisci opere, documenti, cataloghi e attività artistiche. Tutto resta sul tuo dispositivo.':'Manage artworks, documents, catalogs and artistic activities. Everything stays on your device.',
  '＋ Nuova opera':'＋ New artwork','✦ Nuovo certificato':'✦ New certificate','📄 Nuovo catalogo':'📄 New catalog',
  '📚 Nuovo documento':'📚 New document','📅 Nuovo impegno':'📅 New event',
  'Archivio, filtri, immagini e schede complete.':'Archive, filters, images and full records.',
  'PDF, DOCX, testi, immagini e appunti.':'PDF, DOCX, texts, images and notes.',
  'Cataloghi, dossier e stampe d’archivio.':'Catalogs, dossiers and archive prints.',
  'Autenticità, vendita, provenienza e altro.':'Authenticity, sale, provenance and more.',
  'Progetti con opere, documenti e contatti.':'Projects with artworks, documents and contacts.',
  'Esposizioni, sedi, date e cataloghi.':'Exhibitions, venues, dates and catalogs.',
  'Rubrica collezionisti e galleristi.':'Collectors and gallerists address book.',
  'Trattative, incassi e ricevute.':'Deals, payments and receipts.',
  'Impegni, scadenze e promemoria.':'Events, deadlines and reminders.',
  'Siti, riviste, bandi e risorse per l’arte.':'Sites, magazines, calls and art resources.',
  'Curatori, galleristi, critici e giornalisti.':'Curators, gallerists, critics and journalists.',
  'Spazi espositivi, referenti e recapiti.':'Exhibition spaces, contacts and details.',
  'Immagini pronte per Instagram, Facebook e TikTok.':'Images ready for Instagram, Facebook and TikTok.',
  'Cronologia automatica delle attività.':'Automatic activity history.',
  'Profilo, aspetto, PIN, backup e diagnostica.':'Profile, appearance, PIN, backup and diagnostics.',
  'Come usare ogni funzione, senza connessione.':'How to use each feature, offline.',
  'Privacy, licenza e crediti.':'Privacy, license and credits.',
  'Scrivi all’autore per assistenza.':'Write to the author for support.',
  // statistiche
  'Disponibili':'Available','Vendute':'Sold','Documenti':'Documents','Incassato':'Earned',
  'Impegni':'Events','Contatti pro':'Pro contacts','Con immagine':'With image',

  "1 opera importata":"1 artwork imported",
  "Aggiungi immagini alle opere":"Add images to artworks",
  "Anno comune":"Common year",
  "App gratuita e senza pubblicità. Una donazione aiuta a tenerla viva.":"Free app with no ads. A donation helps keep it alive.",
  "Archivio completo creato":"Full archive created",
  "Archivio opere":"Artworks archive",
  "Autenticità, vendita, provenienza e ristampe.":"Authenticity, sale, provenance and reprints.",
  "Azzera timeline da una data":"Reset timeline from a date",
  "Catalogo":"Catalog",
  "Catalogo HTML creato":"HTML catalog created",
  "Catalogo creato":"Catalog created",
  "Catalogo esposizione":"Exhibition catalog",
  "Catalogo mostra":"Exhibition catalog",
  "Cerca appuntamenti, consegne, mostre…":"Search appointments, deliveries, exhibitions…",
  "Cerca curatore, critico, galleria, città, email…":"Search curator, critic, gallery, city, email…",
  "Cerca mostra, luogo, città, curatore…":"Search exhibition, venue, city, curator…",
  "Cerca nome, email, città, preferenze…":"Search name, email, city, preferences…",
  "Cerca opera, cliente, pagamento…":"Search artwork, client, payment…",
  "Cerca opere per titolo, codice, anno, tecnica, dimensioni…":"Search artworks by title, code, year, technique, dimensions…",
  "Cerca titolo, autore, tag, descrizione e note…":"Search title, author, tag, description and notes…",
  "Certificato di Autenticità":"Certificate of Authenticity",
  "Certificato di Donazione":"Certificate of Donation",
  "Certificato di Provenienza":"Certificate of Provenance",
  "Certificato non trovato.":"Certificate not found.",
  "Certificato salvato":"Certificate saved",
  "Cliente non indicato":"Client not specified",
  "Cliente salvato":"Client saved",
  "Cliente senza nome":"Unnamed client",
  "Contatto salvato":"Contact saved",
  "Crea il tuo primo catalogo, inventario o dossier.":"Create your first catalog, inventory or dossier.",
  "Crea prima un certificato":"Create a certificate first",
  "Cronologia generale delle attività.":"General activity history.",
  "Documento salvato":"Document saved",
  "Eliminare definitivamente?":"Delete permanently?",
  "Evento salvato":"Event saved",
  "Excel con immagini, ZIP completo, catalogo HTML, importazione e controllo archivio.":"Excel with images, full ZIP, HTML catalog, import and archive check.",
  "Excel creato":"Excel created",
  "File non trovato: ":"File not found: ",
  "Galleria salvata":"Gallery saved",
  "Imposta prima un PIN.":"Set a PIN first.",
  "Indice delle opere":"Index of artworks",
  "Indice opere":"Artwork index",
  "Inserisci due PIN uguali di 4–6 cifre.":"Enter two matching PINs of 4–6 digits.",
  "Inserisci il nome artista.":"Enter the artist name.",
  "Inserisci un indirizzo":"Enter an address",
  "Inserisci un indirizzo email valido per il nuovo curatore o critico.":"Enter a valid email for the new curator or critic.",
  "Le mie opere":"My artworks",
  "Link salvato":"Link saved",
  "Metodo non indicato":"Method not specified",
  "Modifica certificato":"Edit certificate",
  "Modifica contatto":"Edit contact",
  "Modifica evento":"Edit event",
  "Modifica galleria":"Edit gallery",
  "Modifica link":"Edit link",
  "Modifica mostra":"Edit exhibition",
  "Modifica vendita":"Edit sale",
  "Mostra":"Exhibition",
  "Mostra salvata":"Exhibition saved",
  "Mostra senza titolo":"Untitled exhibition",
  "Nessun certificato creato.":"No certificates created.",
  "Nessun cliente registrato.":"No clients registered.",
  "Nessun contatto professionale.":"No professional contacts.",
  "Nessun contatto trovato.":"No contacts found.",
  "Nessun documento trovato.":"No documents found.",
  "Nessun documento.":"No documents.",
  "Nessun evento da mostrare.":"No events to show.",
  "Nessun evento in agenda.":"No events in the agenda.",
  "Nessun evento.":"No events.",
  "Nessun link salvato.":"No links saved.",
  "Nessun link trovato.":"No links found.",
  "Nessuna":"None",
  "Nessuna galleria salvata.":"No galleries saved.",
  "Nessuna opera con immagine":"No artwork with an image",
  "Nessuna opera con immagine. Aggiungi immagini alle opere per creare post social.":"No artwork with an image. Add images to artworks to create social posts.",
  "Nessuna vendita registrata.":"No sales registered.",
  "Nome della galleria":"Gallery name",
  "Non hai ancora fatto nessun backup":"You haven’t made any backup yet",
  "Non hai ancora inserito opere.":"You haven’t added any artworks yet.",
  "Nuova galleria":"New gallery",
  "Nuova mostra":"New exhibition",
  "Nuova opera":"New artwork",
  "Nuova voce":"New item",
  "Nuovo cliente":"New client",
  "Nuovo contatto professionale":"New professional contact",
  "Nuovo evento":"New event",
  "Nuovo link":"New link",
  "Nuovo progetto PDF":"New PDF project",
  "Nuovo workspace":"New workspace",
  "Opera salvata":"Artwork saved",
  "Opera senza immagine":"Artwork without image",
  "Prezzo (€)":"Price (€)",
  "Prima pagina":"First page",
  "Profilo salvato":"Profile saved",
  "Progetti che uniscono opere, documenti e contatti.":"Projects combining artworks, documents and contacts.",
  "Progetto PDF salvato: puoi aprire il documento":"PDF project saved: you can open the document",
  "Progetto non trovato.":"Project not found.",
  "Record senza ID":"Record without ID",
  "Registra vendita":"Register sale",
  "Ricevuta vendita":"Sale receipt",
  "Salva o condividi il video":"Save or share the video",
  "Salva su file":"Save to file",
  "Scegli la cartella in cui rendere visibile il backup…":"Choose the folder to make the backup visible…",
  "Scegli una cartella visibile del telefono, Drive o memoria esterna…":"Choose a visible phone folder, Drive or external storage…",
  "Seleziona almeno una fotografia.":"Select at least one photo.",
  "Seleziona e copia":"Select and copy",
  "Selezione della cartella annullata.":"Folder selection cancelled.",
  "Sequenza social (max 5 opere)":"Social sequence (max 5 artworks)",
  "Sicurezza salvata":"Security saved",
  "Stato comune":"Common status",
  "Titolo del certificato":"Certificate title",
  "Titolo del video":"Video title",
  "Titolo mancante":"Missing title",
  "Vendita":"Sale",
  "Vendita salvata":"Sale saved",
  "Video salvato: ":"Video saved: ",
  "Workspace salvato":"Workspace saved",
  "Nuovo progetto":"New project",
  "Certificato di Vendita":"Certificate of Sale",
  "Certificato di Esposizione":"Certificate of Exhibition",

  "Agenda libera.":"Agenda free.",
  "Aggiungi PDF, DOCX, testo o immagine":"Add PDF, DOCX, text or image",
  "Aggiungi il primo":"Add the first",
  "Aggiungi il primo cliente":"Add the first client",
  "Aggiungi il primo link":"Add the first link",
  "Aggiungi la prima":"Add the first",
  "Aggiungi la prima opera":"Add the first artwork",
  "Aggiungi un contatto professionale":"Add a professional contact",
  "Aggiungi un evento":"Add an event",
  "Anno: tutti":"Year: all",
  "Apri Vendite per controllare saldo e incassi.":"Open Sales to check balance and payments.",
  "Apri documento":"Open document",
  "Apri vendite":"Open sales",
  "Azioni rapide":"Quick actions",
  "Azzera da data":"Reset from date",
  "Azzera filtri":"Reset filters",
  "Carica il primo file":"Upload the first file",
  "Cliente collegato":"Linked client",
  "Collegati alle opere":"Linked to artworks",
  "Cornice decorativa":"Decorative frame",
  "Cornice: tutte":"Frame: all",
  "Crea Backup":"Create backup",
  "Crea backup completo":"Create full backup",
  "Crea backup rapido":"Create quick backup",
  "Crea il primo certificato":"Create the first certificate",
  "Crea la prima mostra":"Create the first exhibition",
  "Crea portfolio, dossier o listino":"Create portfolio, dossier or price list",
  "Crea post":"Create post",
  "Dimensione: tutte":"Size: all",
  "Filtri avanzati":"Advanced filters",
  "Fotografie delle opere":"Artwork photos",
  "Il tuo lavoro, in un solo posto":"Your work, all in one place",
  "Importa Excel":"Import Excel",
  "Inserisci prima almeno un’opera.":"Add at least one artwork first.",
  "Inserisci prima delle opere.":"Add some artworks first.",
  "Le impostazioni valgono per tutti i cataloghi e certificati generati.":"Settings apply to all generated catalogs and certificates.",
  "Monitora progetti, mostre, clienti, vendite e prossime scadenze.":"Track projects, exhibitions, clients, sales and upcoming deadlines.",
  "Nessun curatore o critico ancora registrato. Premi “Aggiungi nuovo”.":"No curator or critic registered yet. Tap “Add new”.",
  "Nessun progetto. Crea un workspace per riunire materiali e contatti.":"No projects. Create a workspace to gather materials and contacts.",
  "Nuova vendita":"New sale",
  "Nuovo PDF":"New PDF",
  "Nuovo catalogo":"New catalog",
  "Nuovo certificato":"New certificate",
  "Nuovo documento":"New document",
  "Nuovo impegno":"New task",
  "Opera collegata":"Linked artwork",
  "Posizione immagine":"Image position",
  "Preferiti: tutti":"Favorites: all",
  "Prezzo massimo":"Maximum price",
  "Prezzo minimo":"Minimum price",
  "Progetti attivi":"Active projects",
  "Prossime scadenze":"Upcoming deadlines",
  "Raccogli materiali e attività collegate":"Gather related materials and activities",
  "Registra la prima vendita":"Register the first sale",
  "Scegli fino a 5 opere":"Choose up to 5 artworks",
  "Serie / collezione":"Series / collection",
  "Stato: tutti":"Status: all",
  "Supporto: tutti":"Support: all",
  "Tecnica: tutte":"Technique: all",
  "Vendite recenti":"Recent sales",
  "per contatti e documenti":"for contacts and documents",
  "Posizione":"Location",
  "Preferiti":"Favorites",
  "Cliente":"Client",
  "Opera":"Artwork",
  "In corso":"In progress",
  "Evento":"Event",
  "Solo preferiti":"Favorites only",
  "Centrata":"Centered",
  "A sinistra":"Left",
  "A destra":"Right",
  "CENTRO OPERATIVO":"OPERATIONS CENTER",
  "Importa più opere":"Import multiple artworks",
  "Ottimizza immagini":"Optimize images",
  "Aggiungi nuovo":"Add new",
  "Nessun documento allegato":"No attached documents",

  "Le azioni più frequenti, raccolte in una schermata semplice e immediata.":"The most frequent actions, in one simple screen.",
  "Inserisci immagine e scheda completa":"Add image and full record",
  "Autenticità, vendita o provenienza":"Authenticity, sale or provenance",
  "Collezionista, galleria o contatto":"Collector, gallery or contact",
  "Registra esposizione, luogo e date":"Register exhibition, venue and dates",
  "Registra importi, pagamenti e ricevuta":"Register amounts, payments and receipt",
  "Nuovo curatore / critico":"New curator / critic",

  "Comunicazione, rete professionale, sicurezza e configurazione dell’app.":"Communication, professional network, security and app settings.",
  "Comunicazione":"Communication",
  "Rete professionale":"Professional network",
  "App e sicurezza":"App & security",
  "Prepara immagini e sequenze per i social.":"Prepare images and sequences for social media.",
  "Siti, bandi, riviste e risorse.":"Sites, calls, magazines and resources.",
  "Contatti professionali e giornalisti.":"Professional contacts and journalists.",
  "Impostazioni e Backup":"Settings & Backup",
  "Aspetto, profilo, PIN, liste, backup e ripristino.":"Appearance, profile, PIN, lists, backup and restore.",
  "Esportazione dati/Excel":"Data/Excel export",
  "Istruzioni per usare ogni funzione.":"Instructions for every feature.",
  "Versione, privacy e note dell’app.":"Version, privacy and app notes.",
  "Assistenza":"Support",
  "Segnalazioni e richieste.":"Feedback and requests.",

  "Inserisci il PIN":"Enter the PIN",
  "Accedi":"Log in",
  "PIN dimenticato?":"Forgot PIN?",
  "I dati restano solo su questo dispositivo.":"Data stays only on this device.",
  // More, Settings, Backup and Custom Lists
  "🎨 Aspetto":"🎨 Appearance",
  "🔒 Sicurezza":"🔒 Security",
  "👤 Profilo artista":"👤 Artist profile",
  "📄 Impaginazione PDF":"📄 PDF layout",
  "❤️ Sostieni il progetto":"❤️ Support the project",
  "🚪 Chiudi applicazione":"🚪 Close application",
  "🛠 Diagnostica":"🛠 Diagnostics",
  "💾 Backup":"💾 Backup",
  "Animazioni":"Animations",
  "Mostra splash all’avvio":"Show splash at startup",
  "Richiedi PIN all’avvio":"Require PIN at startup",
  "Nuovo PIN (4–6 cifre)":"New PIN (4–6 digits)",
  "Lascia vuoto per non cambiarlo":"Leave blank to keep the current PIN",
  "Conferma PIN":"Confirm PIN",
  "Il PIN è una protezione locale di accesso, non una cifratura dei file.":"The PIN provides local access protection; it does not encrypt files.",
  "Profilo artista":"Artist profile",
  "Formato, margini, caratteri, colori, immagini e sezioni dei documenti generati.":"Format, margins, fonts, colors, images and sections of generated documents.",
  "MAIR GO! è gratuita e senza pubblicità. Una donazione aiuta a mantenerla e migliorarla.":"MAIR GO! is free and ad-free. A donation helps maintain and improve it.",
  "❤️ Dona con PayPal":"❤️ Donate with PayPal",
  "Chiude completamente MAIR GO!. I dati restano salvati.":"Closes MAIR GO! completely. Your data remains saved.",
  "Se qualcosa non funziona, apri il registro errori e invia il testo allo sviluppatore.":"If something does not work, open the error log and send the text to the developer.",
  "Il file .backup contiene tutto l’archivio MAIR GO!: opere e immagini, documenti, certificati, cataloghi, clienti, vendite, agenda e impostazioni.":"The .backup file contains your entire MAIR GO! archive: artworks and images, documents, certificates, catalogs, clients, sales, agenda and settings.",
  "Premi Crea Backup e scegli tu dove salvarlo, per esempio Google Drive o una cartella del telefono. Il file temporaneo usato dall’APK viene eliminato dopo la scelta, anche quando annulli la condivisione.":"Tap Create Backup and choose where to save it, for example Google Drive or a folder on your phone. The temporary file used by the APK is deleted after your choice, even when you cancel sharing.",
  "⚡ Backup rapido":"⚡ Quick backup",
  "🧩 Backup completo multiparte":"🧩 Full multipart backup",
  "↩️ Ripristina backup classico":"↩️ Restore classic backup",
  "📂 Ripristina multiparte":"📂 Restore multipart backup",
  "Rapido: dati e miniature, senza immagini originali. Completo multiparte: progettato per archivi fino a 1000 opere; salva più file piccoli e poi apre la scelta della cartella, così puoi salvarli in Documenti, Drive o memoria esterna. Compatibile anche con i vecchi file .mair e .json. Ultimo backup:":"Quick: data and thumbnails, without original images. Full multipart: designed for archives of up to 1,000 artworks; it saves several smaller files and then opens the folder picker, so you can store them in Documents, Drive or external storage. It is also compatible with older .mair and .json files. Last backup:",
  "mai":"never",
  "Liste personalizzabili":"Custom lists",
  "Tecniche":"Techniques",
  "Supporti":"Supports",
  "Dimensioni":"Dimensions",
  "Cornici":"Frames",
  "Stati":"Statuses",
  "Categorie Biblioteca":"Library categories",
  "＋ Aggiungi voce":"＋ Add item",
  "Salva modifiche":"Save changes",
  "Liste salvate":"Lists saved",
  "Nuova voce":"New item",
  "Comunicazione, rete professionale, sicurezza e configurazione dell’app.":"Communication, professional network, security and app settings.",
  "App e sicurezza":"App & security",
  "Impostazioni e Backup":"Settings & Backup",
  "Aspetto, profilo, PIN, liste, backup e ripristino.":"Appearance, profile, PIN, lists, backup and restore.",
  "Esportazione dati/Excel":"Data/Excel export",
  "Istruzioni per usare ogni funzione.":"Instructions for using every feature.",
  "Versione, privacy e note dell’app.":"Version, privacy and app notes.",
  "Assistenza":"Support",
  "Segnalazioni e richieste.":"Feedback and support requests.",
  // traduzioni completate: Archivio, Nuovo, Attività, Clienti e Vendite
  "Tutto ciò che appartiene al tuo patrimonio artistico e documentale, organizzato in un solo punto.":"Everything belonging to your artistic and documentary heritage, organized in one place.",
  "Biblioteca":"Library",
  "Schede, fotografie, filtri, prezzi e stato.":"Records, photographs, filters, prices and status.",
  "Cataloghi, dossier, listini e portfolio.":"Catalogs, dossiers, price lists and portfolios.",
  "Mostra, scadenza o promemoria":"Exhibition, deadline or reminder",
  "Persone, eventi e operazioni quotidiane dell’atelier.":"People, events and the atelier’s daily operations.",
  "Collezionisti, galleristi e storico acquisti.":"Collectors, gallerists and purchase history.",
  "Trattative, incassi, residui e ricevute.":"Deals, payments, outstanding balances and receipts.",
  // traduzioni completate per Home e finestra Sostieni MAIR GO!
  "Link social":"Social links",
  "Cronologia delle attività e degli eventi.":"History of activities and events.",
  "Profilo, aspetto, liste e backup.":"Profile, appearance, lists and backups.",
  "Come usare ogni sezione dell’app.":"How to use every section of the app.",
  "Versione, licenza e note sull’app.":"Version, license and app notes.",
  "Contatti":"Contact",
  "Segnalazioni e richieste di assistenza.":"Feedback and support requests.",
  "Sostieni MAIR GO!":"Support MAIR GO!",
  "Dona con PayPal a":"Donate via PayPal to",
  "Copia indirizzo PayPal":"Copy PayPal address",
  "Apri PayPal":"Open PayPal",
  "Grazie di cuore per il sostegno.":"Thank you sincerely for your support.",
  "Indirizzo PayPal copiato":"PayPal address copied",
  "Copia manuale: ":"Copy manually: ",
  "Home":"Home",
  "📲 Installa":"📲 Install",

  "Lingua / Language":"Language",
  "English":"English",
  "Rapido":"Quick",
  "Completo multiparte":"Full multipart",
  "Fai il backup ora":"Back up now",
  "Ultimo backup":"Last backup",
  "giorni fa":"days ago",
  "oggi":"today",
  "ieri":"yesterday",

  "💾 Dimensione archivio":"💾 Archive size",
  "Seleziona tutte":"Select all",
  "Seleziona visibili":"Select visible",
  "Deseleziona":"Deselect",
  "Nessuna immagine da mostrare":"No image to show",

  "Esecuzione terminata":"Check completed",
  "Opere con immagine":"Artworks with image",
  "Opere disponibili":"Available artworks",
  "Opere vendute":"Sold artworks",
  "Valore vendite":"Sales value",
  "Statistiche":"Statistics",
  "Statistiche dettagliate":"Detailed statistics",
  "Controllo integrità":"Integrity check",
  "Ricontrolla":"Re-check",
  "Tutti i ruoli":"All roles",
  "Nessun problema rilevato":"No problems found",
  "Problemi":"Problems",

  "Prova e tutorial":"Demo & tutorial",
  "Se hai caricato i dati d’esempio puoi rimuoverli qui. Puoi anche rivedere il giro guidato.":"If you loaded the sample data you can remove it here. You can also replay the guided tour.",
  "Rimuovi dati d’esempio":"Remove sample data",
  "Rivedi il tour":"Replay the tour",

  "Stai usando dati d’esempio":"You’re using sample data",
  "Sono opere e contatti dimostrativi. Rimuovili quando vuoi: le tue voci reali non vengono toccate.":"These are demo artworks and contacts. Remove them anytime: your real entries are untouched.",
  "Rimuovi":"Remove",
  "Carica dati d’esempio":"Load sample data",
  "L’app contiene dati d’esempio (opere, curatore, cliente, vendita, mostra). Quando vuoi puoi rimuoverli: le tue voci reali restano intatte.":"The app contains sample data (artworks, curator, client, sale, exhibition). You can remove it anytime: your real entries stay intact.",
  "Puoi caricare alcuni dati d’esempio per esplorare l’app, e rimuoverli in qualsiasi momento.":"You can load some sample data to explore the app, and remove it anytime.",

  "La tua Home":"Your Home",
  "Qui vedi a colpo d’occhio le statistiche del tuo archivio e le azioni rapide. Il riquadro \"Da fare\" ti ricorda gli impegni in scadenza.":"See your archive stats and quick actions at a glance. The \"To do\" box reminds you of upcoming commitments.",
  "Archivio e Opere":"Archive & Artworks",
  "Il cuore dell’app. Ogni opera ha immagine, scheda completa, prezzo e stato. Puoi filtrare, cercare e toccare un’immagine per vederla intera.":"The heart of the app. Each artwork has an image, full record, price and status. Filter, search and tap an image to see it full-size.",
  "Da qui aggiungi in un tocco: opere, certificati, cataloghi PDF, documenti, clienti, curatori.":"Add in one tap: artworks, certificates, PDF catalogs, documents, clients, curators.",
  "Agenda, mostre, clienti, vendite e la timeline di tutto ciò che accade nel tuo atelier.":"Agenda, exhibitions, clients, sales and the timeline of everything happening in your atelier.",
  "Zona Social, link utili, gallerie, impostazioni, esportazione dati, guida e backup. Esplora con calma.":"Social, useful links, galleries, settings, data export, guide and backup. Explore at your own pace.",
  "Il backup è sacro":"Backup is sacred",
  "I dati stanno solo sul tuo telefono. Fai regolarmente un backup da Impostazioni e salvalo altrove (Drive, email): è l’unico modo per non perderli.":"Your data lives only on your phone. Back up regularly from Settings and save it elsewhere (Drive, email): it’s the only way not to lose it.",
  "Salta il tour":"Skip the tour",
  "Inizia a usare l’app":"Start using the app",
};
function appLang(){return (db&&db.settings&&db.settings.lang)||'it';}
function T(testo){
  if(appLang()==='en'&&I18N[testo])return I18N[testo];
  return testo;
}

function diagLog(tipo,msg){try{window.__LOG__.push('['+new Date().toLocaleTimeString('it-IT')+'] '+tipo+': '+msg);if(window.__LOG__.length>60)window.__LOG__.shift();}catch(e){}}
window.addEventListener('error',function(e){diagLog('ERRORE',(e.message||'?')+' | file: '+(e.filename||'?')+' riga '+(e.lineno||'?'));});
window.addEventListener('unhandledrejection',function(e){diagLog('PROMISE',(e.reason&&e.reason.message)?e.reason.message:String(e.reason));});
function diagOpen(){
  const old=document.getElementById('diagbox');if(old)old.remove();
  const box=document.createElement('div');box.id='diagbox';
  box.setAttribute('style','position:fixed;top:0;left:0;right:0;bottom:0;z-index:999999;background:#111;color:#0f0;font:12px/1.5 monospace;padding:10px;overflow:auto');
  const testo=window.__LOG__.length?window.__LOG__.join('\n\n'):'(nessun errore registrato)';
  const info='DIAGNOSTICA MAIR GO!\n'
    +'Versione app.js: 20.2\n'
    +'docViewerOpen esiste: '+(typeof docViewerOpen)+'\n'
    +'textEditorOpen esiste: '+(typeof textEditorOpen)+'\n'
    +'certDocHtml esiste: '+(typeof certDocHtml)+'\n'
    +'pdfDocHtml esiste: '+(typeof pdfDocHtml)+'\n'
    +'actions.printCert esiste: '+(typeof (window.actions&&window.actions.printCert))+'\n'
    +'navigator.share: '+(typeof navigator.share)+'\n'
    +'Capacitor presente: '+(typeof window.Capacitor)+'\n'
    +'Plugin Filesystem: '+(window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.Filesystem?'SI':'NO')+'\n'
    +'Plugin Share: '+(window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.Share?'SI':'NO')+'\n'
    +'jsPDF caricato: '+(window.jspdf?'SI':'NO')+'\n'
    +'html2canvas caricato: '+(typeof html2canvas==='function'?'SI':'NO')+'\n'
    +'JSZip (export): '+(typeof JSZip!=='undefined'?'SI':'NO')+'\n'
    +'MediaRecorder: '+(typeof window.MediaRecorder)+'\n'
    +'Formato video: '+(typeof videoMimeSupportato==='function'?(videoMimeSupportato()||'NESSUNO'):'?')+'\n'
    +'PDF.js: '+(window.pdfjsLib?'SI':'NO')+'\n'
    +'Mammoth (DOCX): '+(window.mammoth?'SI':'NO')+'\n'
    +'captureStream: '+(typeof document.createElement('canvas').captureStream)+'\n'
    +'--------------------------------\n\n';
  const pre=document.createElement('pre');
  pre.setAttribute('style','white-space:pre-wrap;word-break:break-word;margin:0');
  pre.textContent=info+testo;
  const barra=document.createElement('div');
  barra.setAttribute('style','position:sticky;top:0;background:#111;padding-bottom:8px;display:flex;gap:8px;flex-wrap:wrap');
  const b1=document.createElement('button');b1.textContent='Chiudi';
  b1.setAttribute('style','padding:10px 16px;font-size:14px');
  b1.onclick=()=>box.remove();
  const b2=document.createElement('button');b2.textContent='Copia tutto';
  b2.setAttribute('style','padding:10px 16px;font-size:14px');
  b2.onclick=async()=>{try{await navigator.clipboard.writeText(pre.textContent);b2.textContent='Copiato!'}catch(e){b2.textContent='Selezionalo a mano'}};
  const b3=document.createElement('button');b3.textContent='PROVA APRI DOC';
  b3.setAttribute('style','padding:10px 16px;font-size:14px');
  b3.onclick=()=>{
    try{
      const c=db.certificates[0];
      if(!c){alert('Crea prima un certificato');return}
      diagLog('TEST','provo docViewerOpen con certificato: '+(c.title||'senza titolo'));
      docViewerOpen('TEST',certDocHtml(c),'','testo di prova');
      diagLog('TEST','docViewerOpen chiamata SENZA errori');
    }catch(err){
      diagLog('TEST-ERRORE',err&&err.message?err.message:String(err));
      alert('ERRORE: '+(err&&err.message?err.message:err));
    }
  };
  barra.appendChild(b1);barra.appendChild(b2);barra.appendChild(b3);
  box.appendChild(barra);box.appendChild(pre);
  document.body.appendChild(box);
}

const KEY='mairgo-v5-local';
const IDB_NAME='mair-go-local-database';
const IDB_VERSION=1;
const IDB_STORE='state';
const IDB_KEY='main';
let storageDB=null;
let persistenceChain=Promise.resolve();

function openStorageDB(){
  if(storageDB)return Promise.resolve(storageDB);
  return new Promise((resolve,reject)=>{
    const request=indexedDB.open(IDB_NAME,IDB_VERSION);
    request.onupgradeneeded=()=>{
      const database=request.result;
      if(!database.objectStoreNames.contains(IDB_STORE)){
        database.createObjectStore(IDB_STORE);
      }
    };
    request.onsuccess=()=>{
      storageDB=request.result;
      storageDB.onversionchange=()=>storageDB.close();
      resolve(storageDB);
    };
    request.onerror=()=>reject(request.error);
    request.onblocked=()=>console.warn('Database MAIR GO! bloccato da un’altra scheda.');
  });
}

async function readPersistentState(){
  const database=await openStorageDB();
  return new Promise((resolve,reject)=>{
    const tx=database.transaction(IDB_STORE,'readonly');
    const request=tx.objectStore(IDB_STORE).get(IDB_KEY);
    request.onsuccess=()=>resolve(request.result||null);
    request.onerror=()=>reject(request.error);
  });
}

async function writePersistentState(snapshot){
  const database=await openStorageDB();
  return new Promise((resolve,reject)=>{
    const tx=database.transaction(IDB_STORE,'readwrite');
    tx.objectStore(IDB_STORE).put(snapshot,IDB_KEY);
    tx.oncomplete=()=>resolve();
    tx.onerror=()=>reject(tx.error);
    tx.onabort=()=>reject(tx.error||new Error('Salvataggio annullato'));
  });
}

function queuePersistentSave(){
  const snapshot=clone(db);
  persistenceChain=persistenceChain
    .catch(()=>{})
    .then(()=>writePersistentState(snapshot))
    .catch(error=>{
      console.error('Errore salvataggio IndexedDB:',error);
      toast('Errore di salvataggio locale');
    });
  return persistenceChain;
}

async function initPersistence(){
  try{
    const stored=await readPersistentState();
    if(stored){
      db=merge(clone(defaults),stored);
    }else{
      // Migrazione automatica dalla precedente versione basata su localStorage.
      const legacy=load();
      db=merge(clone(defaults),legacy);
      await writePersistentState(clone(db));
    }
  }catch(error){
    console.error('IndexedDB non disponibile, uso temporaneamente localStorage:',error);
    db=load();
  }
}

const defaults={artworks:[],library:[],links:[],pros:[],galleries:[],collections:[],exhibitions:[],clients:[],sales:[],agenda:[],workspaces:[],pdfProjects:[],certificates:[],settings:{home:{},configurato:false,artist:"Maurizio D'Andrea",bio:'',email:'dandreart.info@gmail.com',phone:'',theme:'atelier',accent:'oro',fontSize:'medium',animations:true,splash:true,pinEnabled:false,pinHash:'',pinLength:4,lastBackup:'',lists:{techniques:['Olio su tela','Acrilico su tela','Acquerello','Tecnica mista','Carboncino','Pastello','Inchiostro','Collage','Digitale','Altro'],supports:['Tela','Tavola','Carta','Cartone','Legno','MDF','Alluminio','Vetro','Stoffa','Altro'],dimensions:['10×10 cm','15×15 cm','20×20 cm','20×30 cm','24×30 cm','30×30 cm','30×40 cm','40×40 cm','40×50 cm','50×50 cm','50×60 cm','50×70 cm','60×60 cm','60×80 cm','70×100 cm','80×80 cm','80×100 cm','90×120 cm','100×100 cm','100×120 cm','100×150 cm','120×120 cm','120×150 cm','150×150 cm','150×200 cm'],frames:['Nessuna','Legno naturale','Bianca','Nera','Dorata','Argento','Cassetta americana','Passe-partout','Personalizzata'],statuses:['Disponibile','Venduto','Riservato','In esposizione','In prestito','Donato','Collezione privata','Non disponibile'],categories:['Catalogo','Scheda tecnica','Contratto','Articolo','Ispirazione','Certificato','Altro']}}};
let db=load(),route=location.hash.slice(1)||'home',currentViewer=null;
const $=s=>document.querySelector(s), app=$('#app'),modal=$('#modal'),viewer=$('#viewer');
function clone(x){return JSON.parse(JSON.stringify(x))}function load(){try{const x=JSON.parse(localStorage.getItem(KEY)||'{}');return merge(clone(defaults),x)}catch{return clone(defaults)}}function merge(a,b){for(const k in b){if(b[k]&&typeof b[k]==='object'&&!Array.isArray(b[k])&&a[k])a[k]=merge(a[k],b[k]);else a[k]=b[k]}return a}function save(){
  // IndexedDB è il salvataggio principale: supporta anche archivi con molte immagini e documenti.
  const persistentSave=queuePersistentSave();
  // Mantiene una copia compatibile solo quando entra nei limiti di localStorage.
  try{
    const serialized=JSON.stringify(db);
    if(serialized.length<1500000)localStorage.setItem(KEY,serialized);
  }catch(error){
    console.warn('Copia localStorage non aggiornata:',error);
  }
  updateHeader();
  return persistentSave;
}const uid=()=>crypto.randomUUID?.()||Date.now().toString(36)+Math.random().toString(36).slice(2);const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));const euro=n=>n?new Intl.NumberFormat('it-IT',{style:'currency',currency:'EUR'}).format(+n):'';function toast(t){const x=$('#toast');x.textContent=T(t);x.classList.add('show');setTimeout(()=>x.classList.remove('show'),1800)}function download(blob,name){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
const titles={home:'MAIR GO!',archive:'Archivio',new:'Crea nuovo',activity:'Attività',more:'Altro',artworks:'Opere',library:'Biblioteca Pro',pdfstudio:'PDF Studio',settings:'Impostazioni',info:'Informazioni',timeline:'Timeline',workspace:'Workspace',exhibitions:'Mostre',clients:'Clienti',sales:'Vendite',agenda:'Agenda',certificates:'Certificati',social:'Zona Social',links:'Link utili',pros:'Curatori e critici',galleries:'Gallerie',certpreview:'Certificato',guide:'Guida offline',contact:'Contatti e segnalazioni'};function updateHeader(){document.documentElement.dataset.theme=db.settings.theme;document.documentElement.dataset.accent=db.settings.accent||'oro';document.documentElement.dataset.font=db.settings.fontSize||'medium';document.documentElement.classList.toggle('reduce-motion',db.settings.animations===false);$('#pageTitle').textContent=T(titles[route]||'MAIR GO!');$('#pageSub').textContent=route==='home'?T('Il tuo atelier digitale'):db.settings.artist;document.querySelectorAll('.bottomnav button').forEach(b=>{const r=b.dataset.route;const active=r===route||(HUB_GROUPS[r]||[]).includes(route);b.classList.toggle('active',active)});traduciNav();traduciStatici()}
function traduciStatici(){
  if(typeof appLang!=='function'||appLang()!=='en')return;
  const map=[
    ['#pinInput','placeholder'],
  ];
  try{
    const q=(sel,txt)=>{const e=document.querySelector(sel);if(e&&txt)e.textContent=T(txt);};
    q('#unlockBtn','Accedi');
    q('#pinHelp','PIN dimenticato?');
    const pinP=document.querySelector('#lockScreen p');if(pinP)pinP.textContent=T('Inserisci il PIN');
    document.querySelectorAll('#modal .modalactions .btn').forEach(b=>{const t=b.textContent.trim();if(t==='Annulla')b.textContent=T('Annulla');if(t==='Salva')b.textContent=T('Salva');});
    const inst=document.querySelector('#installBtn');if(inst)inst.textContent=T('📲 Installa');
  }catch(e){}
}
function traduciNav(){
  const et={home:['Home','Home'],archive:['Archivio','Archive'],new:['Nuovo','New'],activity:['Attività','Activity'],more:['Altro','More']};
  const en=appLang()==='en';
  document.querySelectorAll('.bottomnav button').forEach(b=>{
    const r=b.dataset.route,e=et[r];if(!e)return;
    const span=b.querySelector('span');const ico=span?span.outerHTML:'';
    b.innerHTML=ico+(en?e[1]:e[0]);
  });
}function tHtml(html){
  if(typeof appLang==='function'&&appLang()!=='en')return html;
  try{
    return html
      .replace(/<strong>([^<>{}]+)<\/strong>/g,(m,t)=>'<strong>'+T(t.trim())+'</strong>')
      .replace(/<small>([^<>{}]+)<\/small>/g,(m,t)=>'<small>'+T(t.trim())+'</small>')
      .replace(/<h2>([^<>{}]+)<\/h2>/g,(m,t)=>'<h2>'+T(t.trim())+'</h2>')
      .replace(/<h3>([^<>{}]+)<\/h3>/g,(m,t)=>'<h3>'+T(t.trim())+'</h3>')
      .replace(/<h4>([^<>{}]+)<\/h4>/g,(m,t)=>'<h4>'+T(t.trim())+'</h4>')
      .replace(/<summary>([^<>{}]+)<\/summary>/g,(m,t)=>'<summary>'+T(t.trim())+'</summary>')
      .replace(/<option>([^<>{}]+)<\/option>/g,(m,t)=>'<option>'+T(t.trim())+'</option>')
      .replace(/<option value="([^"]*)">([^<>{}]+)<\/option>/g,(m,v,t)=>'<option value="'+v+'">'+T(t.trim())+'</option>')
      .replace(/<p class="section-intro">([^<>{}]+)<\/p>/g,(m,t)=>'<p class="section-intro">'+T(t.trim())+'</p>');
  }catch(e){return html;}
}
function go(r){route=r;location.hash=r;render();scrollTo(0,0)}function render(){updateHeader();app.innerHTML=tHtml((views[route]||views.home)());bind()}function bind(){document.querySelectorAll('[data-go]').forEach(x=>x.onclick=()=>go(x.dataset.go));document.querySelectorAll('[data-action]').forEach(x=>x.onclick=()=>actions[x.dataset.action]?.(x.dataset.id,x));if(route==='artworks')bindArtworkFilters();if(route==='library')bindLibraryFilters();if(route==='exhibitions')bindSimpleFilter('exSearch','exGrid',db.exhibitions,exhibitionCard);if(route==='clients')bindSimpleFilter('clientSearch','clientGrid',db.clients,clientCard);if(route==='sales')bindSimpleFilter('saleSearch','saleGrid',db.sales,saleCard);if(route==='pros')bindProFilter();if(route==='galleries')bindSimpleFilter('gallerySearch','galleryGrid',db.galleries||[],galleryCard);if(route==='links')bindLinkFilter();if(route==='certificates')bindSimpleFilter('certSearch','certGrid',db.certificates||[],certCard);if(route==='agenda')bindAgendaFilters()}
function section(t,b=''){return `<div class="sectionhead"><h2>${T(t)}</h2>${b}</div>`}function empty(i,t,b=''){return `<div class="empty"><div style="font-size:2.5rem">${i}</div><p>${T(t)}</p>${b}</div>`}function img(src,alt=''){return src?`<img src="${src}" alt="${esc(alt)}" loading="lazy" decoding="async">`:'✦'}function field(label,name,value='',type='text',full=''){return `<div class="field ${full}"><label>${T(label)}</label><input name="${name}" type="${type}" value="${esc(value)}"></div>`}function area(label,name,value='',full='full'){return `<div class="field ${full}"><label>${T(label)}</label><textarea name="${name}">${esc(value)}</textarea></div>`}function selectField(label,name,list,value='',full=''){return `<div class="field ${full}"><label>${label}</label><div class="field-inline"><select name="${name}">${list.map(v=>`<option ${v===value?'selected':''}>${esc(v)}</option>`).join('')}</select><button type="button" class="btn" data-add-list="${name}">＋</button></div></div>`}

function mostraImmagineIntera(src,titolo){
  // overlay a schermo intero con immagine e X per chiudere
  let ov=document.getElementById('imgFull');
  if(ov)ov.remove();
  ov=document.createElement('div');
  ov.id='imgFull';
  ov.innerHTML='<button id="imgFullClose" aria-label="Chiudi">\u2715</button>'
    +'<img src="'+src+'" alt="'+(titolo?String(titolo).replace(/"/g,'')+'':'')+'">'
    +(titolo?'<div class="imgFull-cap">'+esc(titolo)+'</div>':'');
  document.body.appendChild(ov);
  const chiudi=()=>ov.remove();
  ov.querySelector('#imgFullClose').onclick=chiudi;
  ov.onclick=(e)=>{if(e.target===ov)chiudi();};  // click sul fondo chiude
  document.addEventListener('keydown',function esc(e){if(e.key==='Escape'){chiudi();document.removeEventListener('keydown',esc);}});
}

function artworkCard(a){return `<article class="card"><div class="cardimg" data-action="zoomArtwork" data-id="${a.id}" style="cursor:zoom-in">${img(artThumb(a),a.title)}</div><div class="cardbody"><div class="row spread"><h3>${esc(a.title||'Senza titolo')}</h3><button class="star" data-action="toggleArtworkFav" data-id="${a.id}">${a.favorite?'★':'☆'}</button></div><div class="meta">${esc(a.year||'s.d.')} · ${esc(a.technique||'Tecnica non indicata')}</div><span class="badge">${esc(a.dimensions||'Dimensioni n.d.')}</span><span class="badge">${esc(a.status||'Disponibile')}</span>${a.price?`<span class="badge">${euro(a.price)}</span>`:''}<div class="row" style="margin-top:12px"><button class="btn primary" data-action="editArtwork" data-id="${a.id}">Apri</button><button class="btn danger" data-action="deleteArtwork" data-id="${a.id}">Elimina</button></div></div></article>`}
function libCard(d){const ico=d.mime?.includes('pdf')?'📕':d.mime?.includes('word')||d.name?.endsWith('.docx')?'📘':d.mime?.startsWith('image')?'🖼️':'📄';return `<article class="card"><div class="cardbody"><div class="row spread"><div class="doc-type">${ico}</div><button class="star" data-action="toggleLibFav" data-id="${d.id}">${d.favorite?'★':'☆'}</button></div><h3>${esc(d.title||d.name)}</h3><div class="meta">${esc(d.author||'Autore non indicato')} · ${esc(d.category||'Altro')}</div><p>${esc(d.description||'')}</p>${(d.tags||[]).map(t=>`<span class="badge">${esc(t)}</span>`).join('')}<div class="row" style="margin-top:12px"><button class="btn primary" data-action="openLibrary" data-id="${d.id}">Leggi</button><button class="btn" data-action="editLibrary" data-id="${d.id}">Modifica</button><button class="btn danger" data-action="deleteLibrary" data-id="${d.id}">Elimina</button></div></div></article>`}
const themeOptions=[['atelier','Atelier'],['museum','Museo chiaro'],['dark','Dark Gallery'],['blackgold','Black & Gold'],['ocean','Ocean'],['forest','Forest'],['burgundy','Burgundy'],['paper','Carta editoriale'],['violet','Viola contemporaneo']];
function stat(label,value,icon){return `<div class="stat"><span>${icon}</span><strong>${value}</strong><small>${label}</small></div>`}
const BACKUP_DAYS=3;
function backupDaysAgo(){if(!db.settings.lastBackup)return null;const diff=Date.now()-new Date(db.settings.lastBackup).getTime();return Math.floor(diff/86400000);}
function backupBanner(){
  const days=backupDaysAgo();
  const hasData=db.artworks.length||db.certificates.length||db.library.length||db.sales.length||db.clients.length;
  if(!hasData)return '';
  const en=appLang()==='en';
  let cls='backup-banner',icon='💾',msg,sub;
  if(days===null){
    cls+=' warn';icon='⚠️';
    msg=en?'You haven’t created any backups yet':'Non hai ancora fatto nessun backup';
    sub=en?'Save a copy now: it will remain in your phone’s Downloads and survive cache deletion.':'Salva subito una copia: resterà nei Download del telefono e sopravvive alla cancellazione della cache.';
  }else if(days>=BACKUP_DAYS){
    cls+=' warn';icon='⚠️';
    msg=en?`Last backup ${days} days ago`:`Ultimo backup ${days} giorni fa`;
    sub=en?'Too much time has passed. Create a new copy to avoid losing your data.':'È passato troppo tempo. Fai una nuova copia per non rischiare di perdere i dati.';
  }else{
    cls+=' ok';icon='✅';
    msg=en?(days===0?'Backup created today':`Last backup ${days} day${days===1?'':'s'} ago`):(days===0?'Backup fatto oggi':`Ultimo backup ${days} giorn${days===1?'o':'i'} fa`);
    sub=en?'Your data is safely stored in Downloads. Keep it up.':'I tuoi dati sono al sicuro nei Download. Continua così.';
  }
  return `<section class="${cls}"><div class="bb-icon">${icon}</div><div class="bb-text"><strong>${msg}</strong><p>${sub}</p></div><button class="btn primary" data-action="exportBackup">💾 ${en?'Back up now':'Fai il backup ora'}</button></section>`;
}
function placeholderView(icon,title,text){return `${section(title)}<section class="hero"><h2>${icon} ${title}</h2><p>${text}</p></section><div class="empty"><div style="font-size:3rem">${icon}</div><p>Modulo predisposto e integrato nella navigazione. I dati resteranno sempre locali.</p></div>`}
/* ===================== HOME PERSONALIZZABILE ===================== */
const HOME_STATS={
  opere:{label:'Opere',icon:'\ud83c\udfa8',calc:()=>db.artworks.length},
  disponibili:{label:'Disponibili',icon:'\u2713',calc:()=>db.artworks.filter(a=>a.status==='Disponibile').length},
  vendute:{label:'Vendute',icon:'\u25c6',calc:()=>db.artworks.filter(a=>a.status==='Venduto').length},
  documenti:{label:'Documenti',icon:'\ud83d\udcda',calc:()=>db.library.length},
  certificati:{label:'Certificati',icon:'\u2726',calc:()=>db.certificates.length},
  mostre:{label:'Mostre',icon:'\ud83c\udfdb\ufe0f',calc:()=>db.exhibitions.length},
  clienti:{label:'Clienti',icon:'\ud83d\udc65',calc:()=>db.clients.length},
  vendite:{label:'Vendite',icon:'\ud83d\udcb6',calc:()=>db.sales.length},
  incassato:{label:'Incassato',icon:'\u20ac',calc:()=>euro(db.sales.reduce((t,x)=>t+Number(x.paid||0),0))},
  agenda:{label:'Impegni',icon:'\ud83d\udcc5',calc:()=>db.agenda.length},
  contatti:{label:'Contatti pro',icon:'\ud83d\udc64',calc:()=>(db.pros||[]).length},
  gallerie:{label:'Gallerie',icon:'\ud83c\udfdb\ufe0f',calc:()=>(db.galleries||[]).length},
  link:{label:'Link',icon:'\ud83d\udd17',calc:()=>(db.links||[]).length}
};
const HOME_TILES={
  artworks:{icon:'\ud83c\udfa8',title:'Opere',desc:'Archivio, filtri, immagini e schede complete.',count:()=>db.artworks.length},
  library:{icon:'\ud83d\udcda',title:'Biblioteca Pro',desc:'PDF, DOCX, testi, immagini e appunti.',count:()=>db.library.length},
  pdfstudio:{icon:'\ud83d\udcc4',title:'PDF Studio',desc:'Cataloghi, dossier e stampe d\u2019archivio.',count:()=>db.pdfProjects.length},
  certificates:{icon:'\u2726',title:'Certificati',desc:'Autenticit\u00e0, vendita, provenienza e altro.',count:()=>db.certificates.length},
  workspace:{icon:'\ud83e\uddf0',title:'Workspace',desc:'Progetti con opere, documenti e contatti.',count:()=>db.workspaces.length},
  exhibitions:{icon:'\ud83c\udfdb\ufe0f',title:'Mostre',desc:'Esposizioni, sedi, date e cataloghi.',count:()=>db.exhibitions.length},
  clients:{icon:'\ud83d\udc65',title:'Clienti',desc:'Rubrica collezionisti e galleristi.',count:()=>db.clients.length},
  sales:{icon:'\ud83d\udcb6',title:'Vendite',desc:'Trattative, incassi e ricevute.',count:()=>db.sales.length},
  agenda:{icon:'\ud83d\udcc5',title:'Agenda',desc:'Impegni, scadenze e promemoria.',count:()=>db.agenda.length},
  links:{icon:'\ud83d\udd17',title:'Link utili',desc:'Siti, riviste, bandi e risorse per l\u2019arte.',count:()=>(db.links||[]).length},
  pros:{icon:'\ud83d\udc64',title:'Curatori e critici',desc:'Curatori, galleristi, critici e giornalisti.',count:()=>(db.pros||[]).length},
  galleries:{icon:'\ud83c\udfdb\ufe0f',title:'Gallerie',desc:'Spazi espositivi, referenti e recapiti.',count:()=>(db.galleries||[]).length},
  social:{icon:'\ud83d\udcf1',title:'Link social',desc:'Immagini, contenuti e collegamenti per i social.',count:null},
  timeline:{icon:'\ud83d\udd52',title:'Timeline',desc:'Cronologia delle attivit\u00e0 e degli eventi.',count:null},
  settings:{icon:'\u2699\ufe0f',title:'Impostazioni',desc:'Profilo, aspetto, liste e backup.',count:null},
  guide:{icon:'\ud83d\udcd6',title:'Guida offline',desc:'Come usare ogni sezione dell\u2019app.',count:null},
  info:{icon:'\u2139\ufe0f',title:'Informazioni',desc:'Versione, licenza e note sull\u2019app.',count:null},
  contact:{icon:'\u2709\ufe0f',title:'Contatti',desc:'Segnalazioni e richieste di assistenza.',count:null}
};
const HOME_DEFAULT={
  titolo:'',sottotitolo:'',immagine:'',
  stats:['opere','disponibili','vendute','documenti'],
  tiles:['artworks','exhibitions','workspace','pdfstudio','library','galleries','pros','clients','sales','agenda','social','timeline','settings','guide','info','contact'],
  azione:'newArtwork'
};
function homeCfg(){
  const h=db.settings.home||{};
  const preferred=HOME_DEFAULT.tiles.slice();
  if(!h.layoutVersion||h.layoutVersion<3){
    h.tiles=preferred;
    h.layoutVersion=3;
    db.settings.home=h;
    try{save()}catch(e){}
  }
  return Object.assign({},HOME_DEFAULT,h);
}

function agendaOggi(){
  const oggi=new Date();oggi.setHours(0,0,0,0);
  const fra7=new Date(oggi.getTime()+7*86400000);
  const cat={scaduti:[],oggi:[],domani:[],settimana:[]};
  (db.agenda||[]).forEach(x=>{
    if(!x.date)return;
    if(x.done)return;
    const d=new Date(x.date);d.setHours(0,0,0,0);
    const diff=Math.round((d-oggi)/86400000);
    if(diff<0)cat.scaduti.push(x);
    else if(diff===0)cat.oggi.push(x);
    else if(diff===1)cat.domani.push(x);
    else if(d<=fra7)cat.settimana.push(x);
  });
  const ord=(a,b)=>new Date(a.date)-new Date(b.date)||String(a.time||'').localeCompare(String(b.time||''));
  Object.keys(cat).forEach(k=>cat[k].sort(ord));
  return cat;
}
function promemoriaOggi(){
  const c=agendaOggi();
  const tot=c.scaduti.length+c.oggi.length+c.domani.length+c.settimana.length;
  if(!tot)return '';
  const voce=x=>'<li><span class="pm-ora">'+(x.time?esc(x.time):'\u2014')+'</span><span class="pm-tit">'+esc(x.title||'Senza titolo')+'</span>'+(x.location?'<span class="pm-luogo">'+esc(x.location)+'</span>':'')+'</li>';
  const gruppo=(tit,arr,cls)=>arr.length?'<div class="pm-gruppo '+cls+'"><h4>'+tit+' <span>'+arr.length+'</span></h4><ul>'+arr.slice(0,5).map(voce).join('')+(arr.length>5?'<li class="pm-altri">+ '+(arr.length-5)+'</li>':'')+'</ul></div>':'';
  const urgente=c.scaduti.length||c.oggi.length;
  return '<section class="promemoria'+(urgente?' urgente':'')+'">'
    +'<div class="pm-testa"><h3>\ud83d\udcc5 '+T('Da fare')+'</h3><button class="btn" data-go="agenda">'+T('Apri agenda')+'</button></div>'
    +gruppo(T('In ritardo'),c.scaduti,'g-rit')
    +gruppo(T('Oggi'),c.oggi,'g-oggi')
    +gruppo(T('Domani'),c.domani,'g-dom')
    +gruppo(T('Prossimi giorni'),c.settimana,'g-set')
    +'</section>';
}

/* ===================== ZONA SOCIAL ===================== */
const SOCIAL_FORMATI=[['1080x1080','Quadrato 1:1 (Instagram)'],['1080x1350','Verticale 4:5 (Instagram)'],['1080x1920','Storia 9:16 (Stories/TikTok)'],['1200x630','Orizzontale (Facebook/X)']];
const SOCIAL_STILI=[['scuro','Fondo scuro elegante'],['chiaro','Fondo chiaro minimal'],['oro','Nero e oro'],['sfumato','Sfumatura artistica']];

function socialView(){
  const sel=db.artworks.filter(a=>a.image);
  return section('Social','<button class="btn primary" data-action="newSocialPost">\u2726 Crea post</button>')
   +'<section class="hero"><h2>\ud83d\udcf1 Zona Social</h2><p>Prepara immagini pronte per Instagram, Facebook e TikTok partendo dalle tue opere. Puoi creare una singola immagine curata o una sequenza fino a 5 opere.</p></section>'
   +(sel.length?'<div class="row" style="gap:10px;flex-wrap:wrap;margin-bottom:16px">'
     +'<button class="btn" data-action="socialSingolo">\ud83d\uddbc\ufe0f Immagine singola</button>'
     +'<button class="btn" data-action="socialSequenza">\ud83d\uddbc\ufe0f Sequenza immagini</button>'
     +'<button class="btn primary" data-action="socialVideo">\ud83c\udfac Crea video</button>'
     +'</div>':'')
   +(sel.length?'<div class="grid">'+sel.slice(0,12).map(a=>'<article class="card"><div class="cardbody"><img src="'+a.image+'" style="width:100%;height:150px;object-fit:cover;border-radius:8px;margin-bottom:10px"><h3>'+esc(a.title||'Senza titolo')+'</h3><div class="meta">'+esc(a.year||'')+' '+esc(a.technique||'')+'</div><button class="btn primary" data-action="socialDaOpera" data-id="'+a.id+'" style="margin-top:10px">Crea post</button></div></article>').join('')+'</div>'
     : empty('\ud83d\udcf1','Nessuna opera con immagine. Aggiungi immagini alle opere per creare post social.'));
}

// disegna una card social su canvas
async function socialCanvas(opera,cfg){
  const [W,H]=(cfg.formato||'1080x1080').split('x').map(Number);
  const cv=document.createElement('canvas');cv.width=W;cv.height=H;
  const ctx=cv.getContext('2d');
  const stile=cfg.stile||'scuro';
  const oro='#c9a227';
  if(stile==='chiaro'){ctx.fillStyle='#f4f1ea';}
  else if(stile==='oro'){ctx.fillStyle='#0d0d0d';}
  else if(stile==='sfumato'){const g=ctx.createLinearGradient(0,0,W,H);g.addColorStop(0,'#1a1410');g.addColorStop(1,'#3a2c1c');ctx.fillStyle=g;}
  else {ctx.fillStyle='#141210';}
  ctx.fillRect(0,0,W,H);
  const testoCol=(stile==='chiaro')?'#1a1a1a':'#f5efe2';
  // immagine opera: una sola cornice sottile, niente doppio riquadro
  if(opera.image){
    const img=await new Promise((ris,rif)=>{const i=new Image();i.onload=()=>ris(i);i.onerror=rif;i.src=opera.image;});
    const areaH=H*0.60, areaW=W*0.84;
    const sc=Math.min(areaW/img.width,areaH/img.height);
    const iw=img.width*sc, ih=img.height*sc;
    const ix=(W-iw)/2, iy=H*0.115;
    ctx.save();
    ctx.shadowColor='rgba(0,0,0,.5)';ctx.shadowBlur=38;ctx.shadowOffsetY=14;
    ctx.drawImage(img,ix,iy,iw,ih);
    ctx.restore();
  }
  const cx=W/2;
  let y=H*0.80;
  ctx.textAlign='center';
  const etich=(cfg.etichetta||'').trim();
  if(etich){
    ctx.fillStyle=oro;
    ctx.font='600 '+Math.round(W*0.028)+'px Georgia, serif';
    ctx.fillText(etich.toUpperCase().split('').join(' '),cx,y);
    y+=H*0.052;
  }
  ctx.fillStyle=testoCol;
  ctx.font='italic 700 '+Math.round(W*0.062)+'px Georgia, serif';
  const tit=String(cfg.titolo||opera.title||'Senza titolo');
  let t=tit;const maxW=W*0.86;
  while(ctx.measureText(t).width>maxW&&t.length>4)t=t.slice(0,-2);
  if(t!==tit)t=t+'\u2026';
  ctx.fillText(t,cx,y);
  y+=H*0.046;
  const frase=(cfg.frase||'').trim();
  if(frase){
    ctx.fillStyle=(stile==='chiaro')?'#555':'#b9ac93';
    ctx.font='400 '+Math.round(W*0.028)+'px Georgia, serif';
    // testo su piu' righe
    const parole=frase.split(/\s+/);let riga='';const righe=[];
    parole.forEach(pa=>{const prova=riga?riga+' '+pa:pa;if(ctx.measureText(prova).width>W*0.82){if(riga)righe.push(riga);riga=pa;}else riga=prova;});
    if(riga)righe.push(riga);
    righe.slice(0,3).forEach(r=>{ctx.fillText(r,cx,y);y+=H*0.04;});
  }
  if(cfg.mostraFirma!==false){
    ctx.fillStyle=oro;
    ctx.font='700 '+Math.round(W*0.03)+'px Georgia, serif';
    ctx.fillText(String(db.settings.artist||''),cx,H*0.95);
  }
  if(cfg.cornice!==false){
    ctx.strokeStyle=oro;ctx.lineWidth=Math.max(2,W*0.005);
    ctx.strokeRect(W*0.035,H*0.03,W*0.93,H*0.94);
  }
  return cv;
}

async function socialPostModal(opera){
  openModal('Post social \u2014 '+(opera.title||'Opera'),'<div class="formgrid">'
    +'<div class="field"><label>Formato</label><select name="formato">'+SOCIAL_FORMATI.map(([v,l])=>'<option value="'+v+'">'+l+'</option>').join('')+'</select></div>'
    +'<div class="field"><label>Stile</label><select name="stile">'+SOCIAL_STILI.map(([v,l])=>'<option value="'+v+'">'+l+'</option>').join('')+'</select></div>'
    +'<div class="field"><label>Testo in alto</label><input name="etichetta" value="'+esc(opera.year||'')+'"></div>'
    +'<div class="field"><label>Cornice decorativa</label><select name="cornice"><option value="si">S\u00ec</option><option value="no">No</option></select></div>'
    +field('Titolo mostrato (vuoto = titolo opera)','titolo',opera.title||'','text','full')
    +area('Testo / didascalia sotto il titolo (facoltativo)','frase',[opera.technique,opera.dimensions].filter(Boolean).join(' \u00b7 '))
    +'<div class="field full"><label class="chkline"><input type="checkbox" name="mostraFirma" checked> Mostra la firma dell\u2019artista</label></div>'
    +'<p class="meta full">Genera un\u2019immagine curata, pronta per i social.</p>'
  +'</div>',async fd=>{
    modal.close();
    await socialGenera(opera,{formato:fd.get('formato'),stile:fd.get('stile'),etichetta:fd.get('etichetta'),
      cornice:fd.get('cornice')!=='no',titolo:fd.get('titolo'),frase:fd.get('frase'),mostraFirma:!!fd.get('mostraFirma')});
  });
}

async function socialGenera(opera,cfg){
  try{
    toast('Preparo l\u2019immagine\u2026');
    const cv=await socialCanvas(opera,cfg);
    const dataUrl=cv.toDataURL('image/jpeg',0.94);
    socialAnteprima(dataUrl,safeName(opera.title||'post')+'_social.jpg',opera);
  }catch(e){
    diagLog('SOCIAL-ERRORE',e&&e.message?e.message:String(e));
    alert('Impossibile creare l\u2019immagine: '+(e&&e.message?e.message:e));
  }
}

function socialAnteprima(dataUrl,nome,opera){
  const host=document.createElement('div');host.id='socialview';
  host.setAttribute('style','position:fixed;top:0;left:0;right:0;bottom:0;z-index:99999;background:#111;display:flex;flex-direction:column');
  const bar=document.createElement('div');
  bar.setAttribute('style','padding:10px;background:#fff;display:flex;gap:8px;flex-wrap:wrap');
  const mk=(t,pri)=>{const b=document.createElement('button');b.textContent=t;
    b.setAttribute('style','padding:10px 16px;font:600 .95rem system-ui;border:1px solid #bbb;border-radius:8px;'+(pri?'background:#8a6a1f;color:#fff;border-color:#8a6a1f':'background:#fff;color:#111'));
    bar.appendChild(b);return b;};
  const bC=mk('\u2190 Chiudi');
  const bS=mk('\ud83d\udcbe Salva immagine',true);
  const bT=mk('\u270d\ufe0f Testo per il post');
  bC.onclick=()=>host.remove();
  bS.onclick=async()=>{
    const b64=dataUrl.split(',')[1];
    try{
      const Cap=window.Capacitor,FS=Cap&&Cap.Plugins&&Cap.Plugins.Filesystem;
      if(FS){
        let res=null,usata='';
        for(const d of ['EXTERNAL','DATA','DOCUMENTS','CACHE']){
          try{res=await FS.writeFile({path:nome,data:b64,directory:d,recursive:true});usata=d;break;}catch(e){}
        }
        if(res){
          diagLog('SOCIAL','salvata in '+usata+': '+nome);
          const Sh=Cap.Plugins&&Cap.Plugins.Share;
          if(Sh&&res.uri){try{await Sh.share({title:nome,url:res.uri,dialogTitle:'Condividi sui social'});return;}catch(e){}}
          alert('Immagine salvata: '+nome);return;
        }
      }
    }catch(e){diagLog('SOCIAL-SAVE',e&&e.message?e.message:String(e));}
    try{const a=document.createElement('a');a.href=dataUrl;a.download=nome;a.click();}catch(e){alert('Impossibile salvare');}
  };
  bT.onclick=()=>{
    const tag=['#arte','#pittura','#artecontemporanea','#'+String(db.settings.artist||'').replace(/\s+/g,'')].join(' ');
    const testo=(opera.title||'Senza titolo')+(opera.year?' ('+opera.year+')':'')+'\n'
      +[opera.technique,opera.dimensions].filter(Boolean).join(' \u00b7 ')+'\n\n'
      +(opera.description||'')+'\n\n'+db.settings.artist+'\n'+tag;
    textEditorOpen('Testo per il post',testo);
  };
  const wrap=document.createElement('div');
  wrap.setAttribute('style','flex:1;overflow:auto;display:flex;align-items:center;justify-content:center;padding:14px');
  const img=document.createElement('img');img.src=dataUrl;
  img.setAttribute('style','max-width:100%;max-height:100%;box-shadow:0 6px 30px rgba(0,0,0,.6)');
  wrap.appendChild(img);
  host.appendChild(bar);host.appendChild(wrap);
  document.body.appendChild(host);
}

async function socialSequenzaModal(){
  const conImg=db.artworks.filter(a=>a.image);
  if(!conImg.length){toast('Nessuna opera con immagine');return}
  openModal('Sequenza social (max 5 opere)','<div class="formgrid">'
    +'<div class="field"><label>Formato</label><select name="formato">'+SOCIAL_FORMATI.map(([v,l])=>'<option value="'+v+'">'+l+'</option>').join('')+'</select></div>'
    +'<div class="field"><label>Stile</label><select name="stile">'+SOCIAL_STILI.map(([v,l])=>'<option value="'+v+'">'+l+'</option>').join('')+'</select></div>'
    +'<div class="field full"><label>Scegli fino a 5 opere</label><div class="chkgrid">'
      +conImg.slice(0,40).map(a=>'<label class="chkline"><input type="checkbox" name="op" value="'+a.id+'"> '+esc(a.title||'Senza titolo')+'</label>').join('')
    +'</div></div>'
  +'</div>',async fd=>{
    const ids=fd.getAll('op').slice(0,5);
    if(!ids.length){toast('Seleziona almeno un\u2019opera');return}
    modal.close();
    const cfg={formato:fd.get('formato'),stile:fd.get('stile'),etichetta:'Opera'};
    const imgs=[];
    for(let i=0;i<ids.length;i++){
      const a=db.artworks.find(x=>x.id===ids[i]);
      if(!a)continue;
      toast('Preparo '+(i+1)+' di '+ids.length+'\u2026');
      const cv=await socialCanvas(a,Object.assign({},cfg,{etichetta:(i+1)+' / '+ids.length}));
      imgs.push({url:cv.toDataURL('image/jpeg',0.94),nome:safeName(a.title||('opera'+(i+1)))+'_social.jpg',opera:a});
    }
    socialGalleria(imgs);
  });
}

function socialGalleria(imgs){
  const host=document.createElement('div');
  host.setAttribute('style','position:fixed;top:0;left:0;right:0;bottom:0;z-index:99999;background:#111;display:flex;flex-direction:column');
  const bar=document.createElement('div');
  bar.setAttribute('style','padding:10px;background:#fff;display:flex;gap:8px;flex-wrap:wrap;align-items:center');
  const bC=document.createElement('button');bC.textContent='\u2190 Chiudi';
  bC.setAttribute('style','padding:10px 16px;font:600 .95rem system-ui');
  bC.onclick=()=>host.remove();
  const info=document.createElement('span');
  info.textContent=imgs.length+' immagini pronte \u00b7 tocca una per salvarla';
  info.setAttribute('style','font:13px system-ui;color:#555');
  bar.appendChild(bC);bar.appendChild(info);
  const wrap=document.createElement('div');
  wrap.setAttribute('style','flex:1;overflow:auto;padding:14px;display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px');
  imgs.forEach(o=>{
    const c=document.createElement('div');
    c.setAttribute('style','cursor:pointer');
    const im=document.createElement('img');im.src=o.url;
    im.setAttribute('style','width:100%;border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,.5)');
    c.appendChild(im);
    c.onclick=()=>socialAnteprima(o.url,o.nome,o.opera);
    wrap.appendChild(c);
  });
  host.appendChild(bar);host.appendChild(wrap);
  document.body.appendChild(host);
}

/* ===================== VIDEO SOCIAL ===================== */
function videoMimeSupportato(){
  const cand=['video/mp4;codecs=avc1.42E01E','video/mp4','video/webm;codecs=vp9','video/webm;codecs=vp8','video/webm'];
  for(const m of cand){try{if(window.MediaRecorder&&MediaRecorder.isTypeSupported(m))return m;}catch(e){}}
  return '';
}
function vEase(t){return t<0.5?2*t*t:1-Math.pow(-2*t+2,2)/2;}

function vSfondo(ctx,W,H,stile){
  if(stile==='chiaro'){ctx.fillStyle='#f4f1ea';}
  else if(stile==='oro'){ctx.fillStyle='#0d0d0d';}
  else if(stile==='sfumato'){const g=ctx.createLinearGradient(0,0,W,H);g.addColorStop(0,'#1a1410');g.addColorStop(1,'#3a2c1c');ctx.fillStyle=g;}
  else {ctx.fillStyle='#141210';}
  ctx.fillRect(0,0,W,H);
}
function vTestoAdattato(ctx,testo,maxW){
  let t=String(testo||'');
  while(ctx.measureText(t).width>maxW&&t.length>4)t=t.slice(0,-2);
  return t===String(testo||'')?t:t+'\u2026';
}
// disegna una scena opera con effetto scelto
function vScena(ctx,W,H,img,dati,prog,effetto,stile){
  const oro='#c9a227';
  const testoCol=(stile==='chiaro')?'#1a1a1a':'#f5efe2';
  const secCol=(stile==='chiaro')?'#555':'#b9ac93';
  vSfondo(ctx,W,H,stile);
  // apparizione/uscita
  let alpha=1, dx=0, scala=1;
  const fade=0.14;
  if(prog<fade)alpha=prog/fade;
  else if(prog>1-fade)alpha=(1-prog)/fade;
  if(effetto==='scorri'){
    if(prog<fade)dx=(1-prog/fade)*W*0.22;
    else if(prog>1-fade)dx=-(1-(1-prog)/fade)*W*0.22;
  }
  if(effetto==='zoom'){scala=1+0.10*vEase(prog);}
  ctx.save();
  ctx.globalAlpha=Math.max(0,Math.min(1,alpha));
  if(img){
    const areaH=H*0.60, areaW=W*0.80;
    const sc=Math.min(areaW/img.width,areaH/img.height)*scala;
    const iw=img.width*sc, ih=img.height*sc;
    const ix=(W-iw)/2+dx, iy=H*0.11;
    ctx.save();
    ctx.shadowColor='rgba(0,0,0,.55)';ctx.shadowBlur=44;ctx.shadowOffsetY=14;
    ctx.drawImage(img,ix,iy,iw,ih);
    ctx.restore();
    ctx.strokeStyle=oro;ctx.lineWidth=Math.max(2,W*0.004);
    ctx.strokeRect(ix,iy,iw,ih);
  }
  const cx=W/2+dx;
  ctx.textAlign='center';
  let y=H*0.795;
  if(dati.etichetta){
    ctx.fillStyle=oro;
    ctx.font='600 '+Math.round(W*0.026)+'px Georgia, serif';
    ctx.fillText(String(dati.etichetta).toUpperCase().split('').join(' '),cx,y);
  }
  y+=H*0.056;
  ctx.fillStyle=testoCol;
  ctx.font='italic 700 '+Math.round(W*0.060)+'px Georgia, serif';
  ctx.fillText(vTestoAdattato(ctx,dati.titolo||'Senza titolo',W*0.86),cx,y);
  y+=H*0.042;
  ctx.fillStyle=secCol;
  ctx.font='400 '+Math.round(W*0.027)+'px Georgia, serif';
  const riga=[dati.dimensioni,dati.anno].filter(Boolean).join('  \u00b7  ');
  if(riga)ctx.fillText(vTestoAdattato(ctx,riga,W*0.86),cx,y);
  if(dati.file){
    y+=H*0.036;
    ctx.fillStyle=secCol;
    ctx.font='400 '+Math.round(W*0.021)+'px Georgia, serif';
    ctx.fillText(vTestoAdattato(ctx,dati.file,W*0.8),cx,y);
  }
  ctx.restore();
  // firma e cornice sempre piene
  ctx.fillStyle=oro;
  ctx.textAlign='center';
  ctx.font='700 '+Math.round(W*0.029)+'px Georgia, serif';
  ctx.fillText(String(db.settings.artist||''),W/2,H*0.945);
  ctx.strokeStyle=oro;ctx.lineWidth=Math.max(2,W*0.005);
  ctx.strokeRect(W*0.035,H*0.03,W*0.93,H*0.94);
}
function vTitolo(ctx,W,H,titolo,sottotitolo,prog,stile){
  const oro='#c9a227';
  const testoCol=(stile==='chiaro')?'#1a1a1a':'#f5efe2';
  vSfondo(ctx,W,H,stile);
  let alpha=1;const fade=0.22;
  if(prog<fade)alpha=prog/fade;else if(prog>1-fade)alpha=(1-prog)/fade;
  ctx.save();ctx.globalAlpha=Math.max(0,Math.min(1,alpha));
  ctx.textAlign='center';
  ctx.fillStyle=oro;
  ctx.font='600 '+Math.round(W*0.026)+'px Georgia, serif';
  ctx.fillText('',W/2,H*0.40);
  ctx.fillStyle=testoCol;
  ctx.font='700 '+Math.round(W*0.075)+'px Georgia, serif';
  ctx.fillText(vTestoAdattato(ctx,titolo||'Opere',W*0.86),W/2,H*0.50);
  if(sottotitolo){
    ctx.fillStyle=(stile==='chiaro')?'#555':'#b9ac93';
    ctx.font='italic 400 '+Math.round(W*0.032)+'px Georgia, serif';
    ctx.fillText(vTestoAdattato(ctx,sottotitolo,W*0.8),W/2,H*0.565);
  }
  ctx.fillStyle=oro;
  ctx.fillRect(W/2-W*0.06,H*0.60,W*0.12,Math.max(2,H*0.003));
  ctx.restore();
  ctx.strokeStyle=oro;ctx.lineWidth=Math.max(2,W*0.005);
  ctx.strokeRect(W*0.035,H*0.03,W*0.93,H*0.94);
}

async function videoGenera(opere,cfg){
  const mime=videoMimeSupportato();
  if(!mime||!window.MediaRecorder){
    diagLog('VIDEO','MediaRecorder non disponibile');
    alert('Questo dispositivo non pu\u00f2 creare video.\nGenero la sequenza di immagini.');
    return null;
  }
  const [W,H]=(cfg.formato||'1080x1350').split('x').map(Number);
  const cv=document.createElement('canvas');cv.width=W;cv.height=H;
  const ctx=cv.getContext('2d');
  // precarico immagini
  const imgs=[];
  for(const a of opere){
    let im=null;
    if(a.image){try{im=await new Promise((ris,rif)=>{const i=new Image();i.onload=()=>ris(i);i.onerror=rif;i.src=a.image;});}catch(e){}}
    imgs.push(im);
  }
  const fps=30;
  const durTit=2.2;
  const durOp=Number(cfg.durata||4);
  const effetti=['dissolvenza','scorri','zoom'];
  const stile=cfg.stile||'scuro';
  const stream=cv.captureStream(fps);
  const chunks=[];
  const rec=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:5000000});
  rec.ondataavailable=e=>{if(e.data&&e.data.size)chunks.push(e.data);};
  const finito=new Promise(ris=>{rec.onstop=()=>ris();});
  rec.start();
  const attesa=ms=>new Promise(r=>setTimeout(r,ms));
  const passo=1000/fps;
  // titolo
  const nTit=Math.round(durTit*fps);
  for(let f=0;f<nTit;f++){
    vTitolo(ctx,W,H,cfg.titolo,cfg.sottotitolo,f/nTit,stile);
    await attesa(passo);
  }
  // opere
  const nOp=Math.round(durOp*fps);
  for(let i=0;i<opere.length;i++){
    const a=opere[i];
    const eff=cfg.effetto==='misto'?effetti[i%effetti.length]:(cfg.effetto||'dissolvenza');
    const dati={
      titolo:a.title||'Senza titolo',
      anno:a.year||'',
      dimensioni:a.dimensions||'',
      file:cfg.mostraFile?(a.code||a.imageName||''):'',
      etichetta:(i+1)+' / '+opere.length
    };
    for(let f=0;f<nOp;f++){
      vScena(ctx,W,H,imgs[i],dati,f/nOp,eff,stile);
      await attesa(passo);
    }
  }
  // chiusura
  const nFin=Math.round(1.8*fps);
  for(let f=0;f<nFin;f++){
    vTitolo(ctx,W,H,db.settings.artist||'',db.settings.email||'',f/nFin,stile);
    await attesa(passo);
  }
  rec.stop();
  await finito;
  const ext=mime.indexOf('mp4')>=0?'mp4':'webm';
  const blob=new Blob(chunks,{type:mime});
  diagLog('VIDEO','creato '+ext+' '+Math.round(blob.size/1024)+'KB mime='+mime);
  return {blob,ext,mime};
}

function videoAnteprima(res,nome){
  const url=URL.createObjectURL(res.blob);
  const host=document.createElement('div');
  host.setAttribute('style','position:fixed;top:0;left:0;right:0;bottom:0;z-index:99999;background:#111;display:flex;flex-direction:column');
  const bar=document.createElement('div');
  bar.setAttribute('style','padding:10px;background:#fff;display:flex;gap:8px;flex-wrap:wrap;align-items:center');
  const mk=(t,pri)=>{const b=document.createElement('button');b.textContent=t;
    b.setAttribute('style','padding:10px 16px;font:600 .95rem system-ui;border:1px solid #bbb;border-radius:8px;'+(pri?'background:#8a6a1f;color:#fff;border-color:#8a6a1f':'background:#fff;color:#111'));
    bar.appendChild(b);return b;};
  const bC=mk('\u2190 Chiudi');
  const bS=mk('\ud83d\udcbe Salva video',true);
  const info=document.createElement('div');
  info.textContent='Formato '+res.ext.toUpperCase()+' \u00b7 '+Math.round(res.blob.size/1024)+' KB';
  info.setAttribute('style','flex-basis:100%;font:12px system-ui;color:#555');
  bar.appendChild(info);
  bC.onclick=()=>{host.remove();URL.revokeObjectURL(url);};
  bS.onclick=async()=>{
    bS.textContent='\u23f3 Salvo\u2026';bS.disabled=true;
    try{
      const b64=await new Promise((ris,rif)=>{const r=new FileReader();r.onload=()=>ris(String(r.result).split(',')[1]);r.onerror=rif;r.readAsDataURL(res.blob);});
      const Cap=window.Capacitor,FS=Cap&&Cap.Plugins&&Cap.Plugins.Filesystem;
      let ok=false;
      if(FS){
        let w=null,usata='';
        for(const d of ['EXTERNAL','DATA','DOCUMENTS','CACHE']){
          try{w=await FS.writeFile({path:nome,data:b64,directory:d,recursive:true});usata=d;break;}
          catch(e){diagLog('VIDEO-DIR','fallita '+d+': '+(e&&e.message?e.message:e));}
        }
        if(w){
          ok=true;diagLog('VIDEO','salvato in '+usata+': '+nome);
          const Sh=Cap.Plugins&&Cap.Plugins.Share;
          if(Sh&&w.uri){try{await Sh.share({title:nome,url:w.uri,dialogTitle:'Salva o condividi il video'});}catch(e){alert('Video salvato: '+nome);}}
          else alert('Video salvato: '+nome);
        }
      }
      if(!ok){const a=document.createElement('a');a.href=url;a.download=nome;a.click();}
    }catch(e){
      diagLog('VIDEO-SAVE-ERRORE',e&&e.message?e.message:String(e));
      alert('Impossibile salvare il video: '+(e&&e.message?e.message:e));
    }finally{bS.textContent='\ud83d\udcbe Salva video';bS.disabled=false;}
  };
  const wrap=document.createElement('div');
  wrap.setAttribute('style','flex:1;display:flex;align-items:center;justify-content:center;padding:14px;overflow:auto');
  const v=document.createElement('video');
  v.src=url;v.controls=true;v.autoplay=true;v.loop=true;v.playsInline=true;
  v.setAttribute('style','max-width:100%;max-height:100%;box-shadow:0 6px 30px rgba(0,0,0,.6)');
  wrap.appendChild(v);
  host.appendChild(bar);host.appendChild(wrap);
  document.body.appendChild(host);
}

function videoModal(){
  const conImg=db.artworks.filter(a=>a.image);
  if(!conImg.length){toast('Nessuna opera con immagine');return}
  openModal('Crea video social','<div class="formgrid">'
    +field('Titolo del video','titolo',db.settings.artist||'Le mie opere','text','full')
    +field('Sottotitolo','sottotitolo','','text','full')
    +'<div class="field"><label>Formato</label><select name="formato">'
      +'<option value="1080x1350">Verticale 4:5</option><option value="1080x1920">Storia 9:16</option>'
      +'<option value="1080x1080">Quadrato 1:1</option><option value="1200x630">Orizzontale</option></select></div>'
    +'<div class="field"><label>Stile</label><select name="stile">'+SOCIAL_STILI.map(([v,l])=>'<option value="'+v+'">'+l+'</option>').join('')+'</select></div>'
    +'<div class="field"><label>Durata per opera</label><select name="durata"><option value="3">3 secondi</option><option value="4" selected>4 secondi</option><option value="5">5 secondi</option></select></div>'
    +'<div class="field"><label>Transizioni</label><select name="effetto">'
      +'<option value="misto" selected>Mescolate</option><option value="dissolvenza">Dissolvenza</option>'
      +'<option value="scorri">Scorrimento</option><option value="zoom">Zoom lento</option></select></div>'
    +'<div class="field full"><label class="chkline"><input type="checkbox" name="mostraFile" checked> Mostra codice/nome file sotto i dati</label></div>'
    +'<div class="field full"><label>Scegli fino a 5 opere</label><div class="chkgrid">'
      +conImg.slice(0,40).map(a=>'<label class="chkline"><input type="checkbox" name="op" value="'+a.id+'"> '+esc(a.title||'Senza titolo')+'</label>').join('')
    +'</div></div>'
    +'<p class="meta full">La creazione avviene in tempo reale: per 5 opere servono circa 25 secondi. Non chiudere l\u2019app durante la lavorazione.</p>'
  +'</div>',async fd=>{
    const ids=fd.getAll('op').slice(0,5);
    if(!ids.length){toast('Seleziona almeno un\u2019opera');return}
    modal.close();
    const opere=ids.map(id=>db.artworks.find(x=>x.id===id)).filter(Boolean);
    const cfg={titolo:fd.get('titolo'),sottotitolo:fd.get('sottotitolo'),formato:fd.get('formato'),
      stile:fd.get('stile'),durata:+fd.get('durata'),effetto:fd.get('effetto'),mostraFile:!!fd.get('mostraFile')};
    const avviso=document.createElement('div');
    avviso.setAttribute('style','position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.88);color:#f0e6d2;display:flex;flex-direction:column;align-items:center;justify-content:center;font:600 1.05rem system-ui;text-align:center;padding:24px');
    avviso.innerHTML='<div style="font-size:2.6rem;margin-bottom:14px">\ud83c\udfac</div><div>Sto creando il video\u2026</div><div style="font-size:.85rem;opacity:.7;margin-top:10px">Circa '+Math.round(2.2+opere.length*cfg.durata+1.8)+' secondi.<br>Lascia lo schermo acceso.</div>';
    document.body.appendChild(avviso);
    let res=null;
    try{res=await videoGenera(opere,cfg);}
    catch(e){diagLog('VIDEO-ERRORE',e&&e.message?e.message:String(e));}
    avviso.remove();
    if(res&&res.blob&&res.blob.size>1000){
      videoAnteprima(res,safeName(cfg.titolo||'video')+'_social.'+res.ext);
    }else{
      alert('Video non riuscito su questo dispositivo.\nPreparo la sequenza di immagini.');
      const imgs=[];
      for(let i=0;i<opere.length;i++){
        const cv=await socialCanvas(opere[i],{formato:cfg.formato,stile:cfg.stile,etichetta:(i+1)+' / '+opere.length});
        imgs.push({url:cv.toDataURL('image/jpeg',0.94),nome:safeName(opere[i].title||('opera'+(i+1)))+'_social.jpg',opera:opere[i]});
      }
      socialGalleria(imgs);
    }
  });
}

function homeView(){
  const h=homeCfg();
  const titolo=h.titolo||db.settings.artist;
  const sub=h.sottotitolo||T('Gestisci opere, documenti, cataloghi e attività artistiche. Tutto resta sul tuo dispositivo.');
  const azioni={newArtwork:'\uff0b Nuova opera',newCertificate:'\u2726 Nuovo certificato',newPdfProject:'\ud83d\udcc4 Nuovo catalogo',newLibrary:'\ud83d\udcda Nuovo documento',newAgenda:'\ud83d\udcc5 Nuovo impegno'};
  const btn=azioni[h.azione]?`<button class="btn primary" data-action="${esc(h.azione)}">${T(azioni[h.azione])}</button>`:'';
  const hero=`<section class="hero welcome${h.immagine?' has-img':''}"${h.immagine?` style="background-image:linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.55)),url('${h.immagine}');background-size:cover;background-position:center"`:''}>
    <div><small>ART MANAGEMENT SYSTEM</small><h2>${esc(titolo)}</h2><p>${esc(sub)}</p></div>${btn}</section>`;
  const stats=(h.stats||[]).filter(k=>HOME_STATS[k]).map(k=>{const S=HOME_STATS[k];return stat(T(S.label),S.calc(),S.icon)}).join('');
  const tiles=(h.tiles||[]).filter(k=>HOME_TILES[k]).map((k,idx)=>{const TI=HOME_TILES[k];const n=TI.count?TI.count():null;const nav=TI.action?`data-action="${TI.action}"`:`data-go="${k}"`;
    return `<button class="tile home-color-${(idx%8)+1}${idx===0?' big':''}" ${nav}>${n!==null?`<span class="count">${n}</span>`:''}<span class="symbol">${TI.icon}</span><h3>${esc(T(TI.title))}</h3><p>${esc(T(TI.desc))}</p></button>`}).join('');
  return `${hero}${haDatiEsempio()?`<section class="demo-banner"><div><strong>\ud83e\uddea ${T('Stai usando dati d\u2019esempio')}</strong><p>${T('Sono opere e contatti dimostrativi. Rimuovili quando vuoi: le tue voci reali non vengono toccate.')}</p></div><button class="btn" data-action="rimuoviEsempio">${T('Rimuovi')}</button></section>`:''}${stats?`<div class="stats">${stats}</div>`:''}${h.promemoria!==false?promemoriaOggi():''}
    <div class="row spread" style="margin:18px 0 8px"><h3 style="margin:0">Sezioni</h3><button class="btn" data-action="customizeHome">\u2699\ufe0f ${T('Personalizza')}</button></div>
    <div class="tiles">${tiles||('<p class="meta">'+T('Nessuna opera selezionata. Tocca \u201cPersonalizza\u201d.')+'</p>')}</div>
    <section class="dona-banner" data-action="dona"><span class="dona-cuore">\u2764\ufe0f</span><div><strong>${T('Sostieni MAIR GO!')}</strong><p>${T('App gratuita e senza pubblicità. Una donazione aiuta a tenerla viva.')}</p></div><span class="dona-freccia">\u203a</span></section>`;
}

function homeCustomizeModal(){
  const h=homeCfg();
  const chk=(nome,mappa,attivi)=>Object.entries(mappa).map(([k,v])=>`<label class="chkline"><input type="checkbox" name="${nome}" value="${k}" ${attivi.includes(k)?'checked':''}> ${v.icon||''} ${esc(v.label||v.title)}</label>`).join('');
  const ordine=(h.tiles||[]).filter(k=>HOME_TILES[k]);
  openModal('Personalizza la schermata principale',`<div class="formgrid">
    ${field('Titolo personale (vuoto = nome artista)','titolo',h.titolo,'text','full')}
    ${area('Sottotitolo / frase di benvenuto','sottotitolo',h.sottotitolo)}
    <div class="field full"><label>Immagine di sfondo (facoltativa)</label><input name="immagine" type="file" accept="image/*">${h.immagine?'<p class="meta">Immagine presente. Carica per sostituirla.</p><label class="chkline"><input type="checkbox" name="rimuoviImg"> Rimuovi immagine attuale</label>':''}</div>
    <div class="field"><label>Pulsante rapido principale</label><select name="azione">
      <option value="" ${!h.azione?'selected':''}>Nessuno</option>
      <option value="newArtwork" ${h.azione==='newArtwork'?'selected':''}>Nuova opera</option>
      <option value="newCertificate" ${h.azione==='newCertificate'?'selected':''}>Nuovo certificato</option>
      <option value="newPdfProject" ${h.azione==='newPdfProject'?'selected':''}>Nuovo catalogo</option>
      <option value="newLibrary" ${h.azione==='newLibrary'?'selected':''}>Nuovo documento</option>
      <option value="newAgenda" ${h.azione==='newAgenda'?'selected':''}>Nuovo impegno</option></select></div>
    <div class="field full"><label class="chkline"><input type="checkbox" name="promemoria" ${h.promemoria!==false?'checked':''}> Mostra il riquadro \u201cDa fare\u201d</label></div>
    <div class="field full"><label>Statistiche da mostrare</label><div class="chkgrid">${chk('stats',HOME_STATS,h.stats||[])}</div></div>
    <div class="field full"><label>Sezioni da mostrare</label><div class="chkgrid">${chk('tiles',HOME_TILES,h.tiles||[])}</div></div>
    <div class="field full"><label>Ordine delle sezioni (una per riga, quelle non elencate vanno in fondo)</label><textarea name="ordine" rows="6">${esc(ordine.map(k=>HOME_TILES[k].title).join('\n'))}</textarea></div>
  </div>`,async fd=>{
    const img=fd.get('immagine');
    const nuovaImg=img&&img.size?await fileData(img):(fd.get('rimuoviImg')?'':h.immagine);
    let tiles=fd.getAll('tiles');
    const testo=(fd.get('ordine')||'').split('\n').map(x=>x.trim()).filter(Boolean);
    const perTitolo={};Object.entries(HOME_TILES).forEach(([k,v])=>perTitolo[v.title.toLowerCase()]=k);
    const ordinati=[];
    testo.forEach(t=>{const k=perTitolo[t.toLowerCase()];if(k&&tiles.includes(k)&&!ordinati.includes(k))ordinati.push(k)});
    tiles.forEach(k=>{if(!ordinati.includes(k))ordinati.push(k)});
    db.settings.home={titolo:fd.get('titolo')||'',sottotitolo:fd.get('sottotitolo')||'',immagine:nuovaImg,
      stats:fd.getAll('stats'),tiles:ordinati,azione:fd.get('azione')||'',promemoria:!!fd.get('promemoria')};
    save();modal.close();go('home');toast('Schermata principale aggiornata');
  });
}


/* ===================== NAVIGAZIONE UNIFICATA 10.0 ===================== */
const HUB_GROUPS={
  archive:['archive','artworks','library','pdfstudio','certificates','workspace'],
  new:['new'],
  activity:['activity','agenda','exhibitions','clients','sales','timeline'],
  more:['more','social','links','pros','galleries','settings','guide','info','contact']
};
function hubTile(route,icon,title,desc,count){
  const badge=count===undefined||count===null?'':`<span class="hub-count">${count}</span>`;
  return `<button class="hub-tile" data-go="${route}">${badge}<span class="hub-icon">${icon}</span><span class="hub-copy"><strong>${title}</strong><small>${desc}</small></span><span class="hub-arrow">›</span></button>`;
}
function archiveView(){
  return `${section('Archivio')}<p class="section-intro">Tutto ciò che appartiene al tuo patrimonio artistico e documentale, organizzato in un solo punto.</p>
  <div class="hub-grid">
    ${hubTile('artworks','🎨','Opere','Schede, fotografie, filtri, prezzi e stato.',db.artworks.length)}
    ${hubTile('library','📚','Biblioteca','PDF, DOCX, immagini, testi e appunti.',db.library.length)}
    ${hubTile('certificates','✦','Certificati','Autenticità, vendita, provenienza e ristampe.',db.certificates.length)}
    ${hubTile('pdfstudio','📄','PDF Studio','Cataloghi, dossier, listini e portfolio.',db.pdfProjects.length)}
    ${hubTile('workspace','🧰','Workspace','Progetti che uniscono opere, documenti e contatti.',db.workspaces.length)}
  </div>`;
}
function newView(){
  return `${section('Crea nuovo')}<p class="section-intro">Le azioni più frequenti, raccolte in una schermata semplice e immediata.</p>
  <div class="quick-create-grid">
    <button class="quick-create primary-create" data-action="newArtwork"><span>🎨</span><strong>Nuova opera</strong><small>Inserisci immagine e scheda completa</small></button>
    <button class="quick-create" data-action="newCertificate"><span>✦</span><strong>Nuovo certificato</strong><small>Autenticità, vendita o provenienza</small></button>
    <button class="quick-create" data-action="newLibrary"><span>📚</span><strong>Nuovo documento</strong><small>Aggiungi PDF, DOCX, testo o immagine</small></button>
    <button class="quick-create" data-action="newPdfProject"><span>📄</span><strong>Nuovo catalogo</strong><small>Crea portfolio, dossier o listino</small></button>
    <button class="quick-create" data-action="newClient"><span>👥</span><strong>Nuovo cliente</strong><small>Collezionista, galleria o contatto</small></button>
    <button class="quick-create" data-action="newPro"><span>👤</span><strong>Nuovo curatore / critico</strong><small>Aggiungi un contatto professionale</small></button>
    <button class="quick-create" data-action="newExhibition"><span>🏛️</span><strong>Nuova mostra</strong><small>Registra esposizione, luogo e date</small></button>
    <button class="quick-create" data-action="newSale"><span>💶</span><strong>Nuova vendita</strong><small>Registra importi, pagamenti e ricevuta</small></button>
    <button class="quick-create" data-action="newAgenda"><span>📅</span><strong>Nuovo impegno</strong><small>Mostra, scadenza o promemoria</small></button>
    <button class="quick-create" data-action="newWorkspace"><span>🧰</span><strong>Nuovo progetto</strong><small>Raccogli materiali e attività collegate</small></button>
  </div>`;
}
function activityView(){
  const aperte=(db.sales||[]).filter(x=>Number(x.paid||0)<Number(x.amount||x.total||0)).length;
  return `${section('Attività')}<p class="section-intro">Persone, eventi e operazioni quotidiane dell’atelier.</p>
  <div class="hub-grid">
    ${hubTile('agenda','📅','Agenda','Impegni, scadenze e promemoria.',db.agenda.length)}
    ${hubTile('exhibitions','🏛️','Mostre','Esposizioni, sedi, date e cataloghi.',db.exhibitions.length)}
    ${hubTile('clients','👥','Clienti','Collezionisti, galleristi e storico acquisti.',db.clients.length)}
    ${hubTile('sales','💶','Vendite','Trattative, incassi, residui e ricevute.',db.sales.length)}
    ${hubTile('timeline','🕒','Timeline','Cronologia generale delle attività.',null)}
  </div>${aperte?`<div class="attention-card"><span>⚠️</span><div><strong>${aperte} vendit${aperte===1?'a':'e'} con pagamento da verificare</strong><small>Apri Vendite per controllare saldo e incassi.</small></div><button class="btn" data-go="sales">Controlla</button></div>`:''}`;
}
function moreView(){
  return `${section('Altro')}<p class="section-intro">Comunicazione, rete professionale, sicurezza e configurazione dell’app.</p>
  <div class="hub-section"><h3>Comunicazione</h3><div class="hub-grid compact">
    ${hubTile('social','📱','Zona Social','Prepara immagini e sequenze per i social.',null)}
    ${hubTile('links','🔗','Link utili','Siti, bandi, riviste e risorse.',(db.links||[]).length)}
  </div></div>
  <div class="hub-section"><h3>Rete professionale</h3><div class="hub-grid compact">
    ${hubTile('pros','👤','Curatori e critici','Contatti professionali e giornalisti.',(db.pros||[]).length)}
    ${hubTile('galleries','🏛️','Gallerie','Spazi espositivi, referenti e recapiti.',(db.galleries||[]).length)}
  </div></div>
  <div class="hub-section"><h3>App e sicurezza</h3><div class="hub-grid compact">
    ${hubTile('settings','⚙️','Impostazioni e Backup','Aspetto, profilo, PIN, liste, backup e ripristino.',null)}
    ${hubTile('archiveTools','📊','Esportazione dati/Excel','Excel con immagini, ZIP completo, catalogo HTML, importazione e controllo archivio.',null)}
    ${hubTile('guide','📖','Guida offline','Istruzioni per usare ogni funzione.',null)}
    ${hubTile('info','ℹ️','Informazioni','Versione, privacy e note dell’app.',null)}
    ${hubTile('contact','✉️','Assistenza','Segnalazioni e richieste.',null)}
  </div></div>`;
}

const views={home:()=>homeView(),archive:()=>archiveView(),new:()=>newView(),activity:()=>activityView(),more:()=>moreView(),social:()=>socialView(),links:()=>linksView(),pros:()=>proView(),galleries:()=>galleriesView(),artworks:()=>`${section('Archivio opere','<div class="row"><button class="btn primary" data-action="newArtwork">＋ Nuova opera</button><button class="btn" data-action="bulkImportArtworks">🖼️ Importa più opere</button><button class="btn" data-action="optimizeArtworkImages">⚡ Ottimizza immagini</button></div>')}<section class="hero"><h2>Il tuo archivio artistico</h2><p>Organizza e gestisci le tue opere artistiche, con immagini, schede, prezzi e stato.</p></section><details class="filterpanel"><summary>Filtri avanzati</summary><div class="filtergrid"><input id="artSearch" class="search" placeholder="Cerca in ogni campo…"><select id="artStatus"><option value="">Stato: tutti</option>${db.settings.lists.statuses.map(x=>`<option>${esc(x)}</option>`)}</select><select id="artYear"><option value="">Anno: tutti</option>${[...new Set(db.artworks.map(a=>a.year).filter(Boolean))].sort().reverse().map(x=>`<option>${esc(x)}</option>`)}</select><select id="artTechnique"><option value="">Tecnica: tutte</option>${db.settings.lists.techniques.map(x=>`<option>${esc(x)}</option>`)}</select><select id="artSupport"><option value="">Supporto: tutti</option>${db.settings.lists.supports.map(x=>`<option>${esc(x)}</option>`)}</select><select id="artDimension"><option value="">Dimensione: tutte</option>${db.settings.lists.dimensions.map(x=>`<option>${esc(x)}</option>`)}</select><select id="artFrame"><option value="">Cornice: tutte</option>${db.settings.lists.frames.map(x=>`<option>${esc(x)}</option>`)}</select><input id="artCollection" placeholder="Serie / collezione"><input id="artLocation" placeholder="Posizione"><select id="artFavorite"><option value="">Preferiti: tutti</option><option value="yes">Solo preferiti</option></select><input id="artMinPrice" type="number" placeholder="Prezzo minimo"><input id="artMaxPrice" type="number" placeholder="Prezzo massimo"><button class="btn" data-action="resetArtworkFilters">Azzera filtri</button></div><div id="filterCount" class="meta"></div></details><div id="artGrid" class="grid">${db.artworks.slice(0,24).map(artworkCard).join('')||empty('🎨','Non hai ancora inserito opere.','<button class="btn primary" data-action="newArtwork">Aggiungi la prima opera</button>')}</div>`,
library:()=>`${section('Biblioteca Pro','<button class="btn primary" data-action="newLibrary">＋ Carica file</button>')}<div class="toolbar"><input id="libSearch" class="search" 'Cerca titolo, autore, tag, descrizione e note…')}"><select id="libType"><option value="">Tutti i file</option><option value="pdf">PDF</option><option value="doc">Documenti</option><option value="image">Immagini</option><option value="fav">Preferiti</option><option value="linked">Collegati alle opere</option></select><select id="libCat"><option value="">Tutte le categorie</option>${db.settings.lists.categories.map(x=>`<option>${esc(x)}</option>`)}</select></div><div id="libGrid" class="grid">${db.library.map(libCard).join('')||empty('📚','Carica PDF, DOCX, testi, immagini, cataloghi e schede tecniche.','<button class="btn primary" data-action="newLibrary">Carica il primo file</button>')}</div>`,
pdfstudio:()=>`${section('PDF Studio','<button class="btn primary" data-action="newPdfProject">＋ Nuovo PDF</button>')}<section class="hero"><h2>Documenti altamente personalizzabili</h2><p>Crea stampe dell'archivio, cataloghi di esposizioni e PDF filtrati. Scegli tema, copertina, campi, testi e opere; poi salva in PDF o condividi.</p></section><div class="template-row"><span class="badge">Archivio</span><span class="badge">Catalogo mostra</span><span class="badge">Portfolio</span><span class="badge">Listino</span><span class="badge">Dossier</span><span class="badge">Certificato</span></div><div class="grid">${db.pdfProjects.map(p=>`<article class="card"><div class="cardbody"><h3>${esc(p.title)}</h3><div class="meta">${esc(p.type)} · ${(p.artworkIds||[]).length} opere · ${esc(p.theme)}</div><p>${esc(p.subtitle||'')}</p><div class="row"><button class="btn primary" data-action="openPdfProject" data-id="${p.id}">Apri</button><button class="btn" data-action="editPdfProject" data-id="${p.id}">Modifica</button><button class="btn danger" data-action="deletePdfProject" data-id="${p.id}">Elimina</button></div></div></article>`).join('')||empty('📄','Crea il tuo primo catalogo, inventario o dossier.','<button class="btn primary" data-action="newPdfProject">Nuovo PDF</button>')}</div>`,
settings:()=>settingsView(),info:()=>infoView(),guide:()=>guideView(),contact:()=>contactView(),timeline:()=>timelineView(),workspace:()=>workspaceView(),exhibitions:()=>exhibitionsView(),clients:()=>clientsView(),sales:()=>salesView(),agenda:()=>agendaView(),certificates:()=>certificatesView(),certpreview:()=>certPreviewView(),pdfpreview:()=>pdfPreviewView()};

function fmtDate(v){if(!v)return '—';const d=new Date(v);return Number.isNaN(d.getTime())?esc(v):d.toLocaleDateString('it-IT')}
function optionList(arr,value=''){return arr.map(x=>`<option value="${esc(x.id)}" ${x.id===value?'selected':''}>${esc(x.title||x.name||x.company||'Senza nome')}</option>`).join('')}
function workspaceView(){const upcoming=[...db.agenda].filter(x=>x.date).sort((a,b)=>new Date(a.date)-new Date(b.date)).slice(0,5);const recentSales=[...db.sales].sort((a,b)=>new Date(b.date||0)-new Date(a.date||0)).slice(0,4);return `${section('Workspace','<button class="btn primary" data-action="newWorkspace">＋ Nuovo progetto</button>')}<section class="hero welcome"><div><small>CENTRO OPERATIVO</small><h2>Il tuo lavoro, in un solo posto</h2><p>Monitora progetti, mostre, clienti, vendite e prossime scadenze.</p></div><button class="btn" data-action="newAgenda">＋ Promemoria</button></section><div class="stats">${stat('Progetti',db.workspaces.length,'🧰')}${stat('Mostre',db.exhibitions.length,'🏛️')}${stat('Clienti',db.clients.length,'👥')}${stat('Vendite',db.sales.length,'💶')}</div><div class="dashboard-grid"><section class="card"><div class="cardbody"><div class="row spread"><h3>Progetti attivi</h3><button class="btn" data-action="newWorkspace">＋</button></div>${db.workspaces.map(w=>`<div class="record"><div><strong>${esc(w.title)}</strong><div class="meta">${esc(w.status||'In corso')} · ${(w.artworkIds||[]).length} opere · ${(w.documentIds||[]).length} documenti</div></div><div class="row"><button class="btn" data-action="editWorkspace" data-id="${w.id}">Apri</button><button class="btn danger" data-action="deleteWorkspace" data-id="${w.id}">×</button></div></div>`).join('')||'<p class="meta">Nessun progetto. Crea un workspace per riunire materiali e contatti.</p>'}</div></section><section class="card"><div class="cardbody"><h3>Prossime scadenze</h3>${upcoming.map(x=>`<div class="record"><span class="datebox">${fmtDate(x.date)}</span><div><strong>${esc(x.title)}</strong><div class="meta">${esc(x.type||'Evento')} ${x.time?'· '+esc(x.time):''}</div></div></div>`).join('')||'<p class="meta">Agenda libera.</p>'}<button class="btn" data-go="agenda">Apri agenda</button></div></section><section class="card"><div class="cardbody"><h3>Vendite recenti</h3>${recentSales.map(s=>{const a=db.artworks.find(x=>x.id===s.artworkId),c=db.clients.find(x=>x.id===s.clientId);return`<div class="record"><div><strong>${esc(a?.title||'Opera')}</strong><div class="meta">${esc(c?.name||'Cliente non indicato')} · ${fmtDate(s.date)}</div></div><strong>${euro(s.total)}</strong></div>`}).join('')||'<p class="meta">Nessuna vendita registrata.</p>'}<button class="btn" data-go="sales">Apri vendite</button></div></section><section class="card"><div class="cardbody"><h3>Azioni rapide</h3><div class="quickgrid"><button class="btn" data-action="newExhibition">🏛️ Nuova mostra</button><button class="btn" data-action="newClient">👤 Nuovo cliente</button><button class="btn" data-action="newSale">💶 Registra vendita</button><button class="btn" data-action="newAgenda">📅 Nuovo evento</button></div></div></section></div>`}
function exhibitionsView(){return `${section('Mostre','<button class="btn primary" data-action="newExhibition">＋ Nuova mostra</button>')}<div class="toolbar"><input id="exSearch" class="search" 'Cerca mostra, luogo, città, curatore…')}"></div><div id="exGrid" class="grid">${db.exhibitions.map(exhibitionCard).join('')||empty('🏛️','Non hai ancora inserito mostre.','<button class="btn primary" data-action="newExhibition">Crea la prima mostra</button>')}</div>`}
function exhibitionCard(x){return `<article class="card">${x.poster?`<img src="${x.poster}" alt="locandina" style="width:100%;max-height:220px;object-fit:cover;border-radius:12px 12px 0 0">`:``}<div class="cardbody"><div class="row spread"><h3>${esc(x.title||'Mostra senza titolo')}</h3><span class="badge">${esc(x.status||'In programma')}</span></div><p class="meta">${fmtDate(x.startDate)} – ${fmtDate(x.endDate)}<br>${esc([x.venue,x.city].filter(Boolean).join(', '))}</p><p>${esc(x.description||'')}</p><div class="meta">${(x.artworkIds||[]).length} opere · Curatore/critico: ${esc(x.curator||'—')}${x.gallerist?' · Gallerista/galleria: '+esc(x.gallerist):''}</div><div class="row" style="margin-top:12px"><button class="btn primary" data-action="editExhibition" data-id="${x.id}">Apri</button><button class="btn" data-action="catalogFromExhibition" data-id="${x.id}">Catalogo PDF</button><button class="btn danger" data-action="deleteExhibition" data-id="${x.id}">Elimina</button></div></div></article>`}
function clientsView(){return `${section('Clienti','<button class="btn primary" data-action="newClient">＋ Nuovo cliente</button>')}<section class="hero"><h2>I tuoi clienti, sempre a portata di mano</h2><p>Gestisci collezionisti, galleristi, contatti, preferenze e storico degli acquisti.</p></section><div class="toolbar"><input id="clientSearch" class="search" 'Cerca nome, email, città, preferenze…')}"></div><div id="clientGrid" class="grid">${db.clients.map(clientCard).join('')||empty('👥','Nessun cliente registrato.','<button class="btn primary" data-action="newClient">Aggiungi il primo cliente</button>')}</div>`}
function clientCard(c){const purchases=db.sales.filter(s=>s.clientId===c.id);return `<article class="card"><div class="cardbody"><h3>${esc(c.name||'Cliente senza nome')}</h3><div class="meta">${esc(c.company||'')} ${c.city?'· '+esc(c.city):''}</div><p>${esc(c.email||'')} ${c.phone?'· '+esc(c.phone):''}</p><div><span class="badge">${purchases.length} acquisti</span><span class="badge">${euro(purchases.reduce((n,s)=>n+Number(s.total||0),0))}</span></div><p class="meta">Preferenze: ${esc(c.preferences||'—')}</p><div class="row"><button class="btn primary" data-action="editClient" data-id="${c.id}">Apri</button><button class="btn" data-action="newSaleForClient" data-id="${c.id}">＋ Vendita</button><button class="btn danger" data-action="deleteClient" data-id="${c.id}">Elimina</button></div></div></article>`}
function salesView(){const total=db.sales.reduce((n,s)=>n+Number(s.total||0),0),paid=db.sales.reduce((n,s)=>n+Number(s.paid||0),0);return `${section('Vendite','<button class="btn primary" data-action="newSale">＋ Registra vendita</button>')}<section class="hero"><h2>Tieni sotto controllo le vendite</h2><p>Registra trattative, incassi, pagamenti e ricevute in un unico spazio.</p></section><div class="stats">${stat('Operazioni',db.sales.length,'🧾')}${stat('Totale',euro(total),'💶')}${stat('Incassato',euro(paid),'✓')}${stat('Da incassare',euro(Math.max(0,total-paid)),'◷')}</div><div class="toolbar"><input id="saleSearch" class="search" 'Cerca opera, cliente, pagamento…')}"></div><div id="saleGrid" class="grid">${db.sales.map(saleCard).join('')||empty('💶','Nessuna vendita registrata.','<button class="btn primary" data-action="newSale">Registra la prima vendita</button>')}</div>`}
function saleCard(s){const a=db.artworks.find(x=>x.id===s.artworkId),c=db.clients.find(x=>x.id===s.clientId),due=Number(s.total||0)-Number(s.paid||0);return `<article class="card"><div class="cardbody"><div class="row spread"><h3>${esc(a?.title||'Opera non collegata')}</h3><span class="badge">${due<=0?'Saldato':'Da saldare'}</span></div><div class="meta">${esc(c?.name||'Cliente non indicato')} · ${fmtDate(s.date)}</div><p><strong>${euro(s.total)}</strong> · Incassato ${euro(s.paid)}</p><p class="meta">${esc(s.paymentMethod||'Metodo non indicato')} ${s.delivery?'· '+esc(s.delivery):''}</p><div class="row"><button class="btn primary" data-action="editSale" data-id="${s.id}">Apri</button><button class="btn" data-action="printReceipt" data-id="${s.id}">Ricevuta</button><button class="btn danger" data-action="deleteSale" data-id="${s.id}">Elimina</button></div></div></article>`}
function agendaView(){const sorted=[...db.agenda].sort((a,b)=>new Date(a.date)-new Date(b.date));return `${section('Agenda','<button class="btn primary" data-action="newAgenda">＋ Nuovo evento</button>')}<section class="hero"><h2>Organizza il tuo tempo</h2><p>Pianifica appuntamenti, mostre, consegne, scadenze e promemoria.</p></section><div class="toolbar"><input id="agendaSearch" class="search" 'Cerca appuntamenti, consegne, mostre…')}"><select id="agendaType"><option value="">Tutti i tipi</option>${['Appuntamento','Mostra','Consegna','Scadenza','Promemoria','Altro'].map(x=>`<option>${x}</option>`).join('')}</select></div><div id="agendaList" class="agenda-list">${sorted.map(agendaCard).join('')||empty('📅','Nessun evento in agenda.','<button class="btn primary" data-action="newAgenda">Aggiungi un evento</button>')}</div><button class="btn" data-action="exportAgendaIcs" style="margin-top:16px">Esporta agenda .ics</button>`}
function agendaCard(x){return `<article class="agenda-item card"><div class="datebox"><strong>${new Date(x.date).getDate()||''}</strong><small>${x.date?new Date(x.date).toLocaleDateString('it-IT',{month:'short'}):'—'}</small></div><div class="cardbody"><div class="row spread"><h3>${esc(x.title)}</h3><span class="badge">${esc(x.type||'Evento')}</span></div><div class="meta">${fmtDate(x.date)} ${x.time?'· '+esc(x.time):''} ${x.location?'· '+esc(x.location):''}</div><p>${esc(x.notes||'')}</p><div class="row"><button class="btn" data-action="editAgenda" data-id="${x.id}">Modifica</button><button class="btn danger" data-action="deleteAgenda" data-id="${x.id}">Elimina</button></div></div></article>`}
function artworkPickerHtml(selectedIds=[],prefix='artPick'){
  const selected=new Set(selectedIds||[]);
  return `<div class="art-picker" data-art-picker="${prefix}"><input type="search" class="search art-picker-search" placeholder="Cerca opere per titolo, codice, anno, tecnica, dimensioni…"><div class="row spread" style="margin:8px 0"><div class="art-picker-count meta"></div><div class="row"><button type="button" class="btn art-picker-all">Seleziona tutte</button><button type="button" class="btn art-picker-none">Deseleziona</button></div></div><div class="art-picker-grid">${db.artworks.map(a=>`<label class="art-pick-card" data-search="${esc([a.title,a.code,a.year,a.technique,a.support,a.dimensions,a.collection,a.status].filter(Boolean).join(' ').toLowerCase())}"><input type="checkbox" name="arts" value="${esc(a.id)}" ${selected.has(a.id)?'checked':''}><span class="art-pick-thumb">${(a.thumb||a.thumbnail||a.image)?`<img loading="lazy" src="${artThumb(a)}" alt="">`:'🎨'}</span><span class="art-pick-text"><strong>${esc(a.title||'Senza titolo')}</strong><small>${esc([a.code,a.year,a.technique].filter(Boolean).join(' · '))}</small></span></label>`).join('')||'<p class="meta">Inserisci prima delle opere.</p>'}</div></div>`;
}
function bindArtworkPicker(prefix='artPick'){
  const root=document.querySelector(`[data-art-picker="${prefix}"]`);if(!root)return;
  const input=root.querySelector('.art-picker-search'),cards=[...root.querySelectorAll('.art-pick-card')],count=root.querySelector('.art-picker-count');
  const update=()=>{const terms=(input?.value||'').trim().toLowerCase().split(/\s+/).filter(Boolean);let shown=0;cards.forEach(c=>{const hay=c.dataset.search||'';const ok=!terms.length||terms.every(t=>hay.includes(t));c.hidden=!ok;if(ok)shown++;});if(count)count.textContent=`${shown} opere visualizzate · ${cards.filter(c=>c.querySelector('input').checked).length} selezionate`;};
  input?.addEventListener('input',update);root.addEventListener('change',update);
  root.querySelector('.art-picker-all')?.addEventListener('click',()=>{cards.filter(c=>!c.hidden).forEach(c=>c.querySelector('input').checked=true);update();});
  root.querySelector('.art-picker-none')?.addEventListener('click',()=>{cards.forEach(c=>c.querySelector('input').checked=false);update();});
  update();
}
function workspaceModal(w={}){const arts=artworkPickerHtml(w.artworkIds||[],'workspaceArts'),docs=db.library.map(d=>`<label><input type="checkbox" name="docs" value="${d.id}" ${w.documentIds?.includes(d.id)?'checked':''}> ${esc(d.title||d.name)}</label>`).join(''),clients=db.clients.map(c=>`<option value="${c.id}" ${w.clientId===c.id?'selected':''}>${esc(c.name)}</option>`).join('');openModal(w.id?'Modifica workspace':'Nuovo workspace',`<div class="formgrid">${field('Titolo','title',w.title,'text','full')}${field('Stato','status',w.status||'In corso')}${field('Scadenza','deadline',w.deadline,'date')}<div class="field full"><label>Cliente collegato</label><select name="clientId"><option value="">Nessuno</option>${clients}</select></div>${area('Obiettivo / descrizione','description',w.description)}<div class="field full"><label>Opere collegate</label>${arts}</div><div class="field full"><label>Documenti collegati</label><div class="checkgrid">${docs||'Nessun documento.'}</div></div></div>`,async fd=>{const o={...w,id:w.id||uid(),title:fd.get('title'),status:fd.get('status'),deadline:fd.get('deadline'),clientId:fd.get('clientId'),description:fd.get('description'),artworkIds:fd.getAll('arts'),documentIds:fd.getAll('docs'),updated:new Date().toISOString(),created:w.created||new Date().toISOString()};if(w.id)db.workspaces=db.workspaces.map(x=>x.id===w.id?o:x);else db.workspaces.unshift(o);await save();modal.close();render();toast('Workspace salvato')});bindArtworkPicker('workspaceArts')}
function ensureExhibitionEnhancementStyles(){
  if(document.getElementById('mair-exhibition-enhancement-css'))return;
  const st=document.createElement('style');st.id='mair-exhibition-enhancement-css';st.textContent=`
  .exhibition-artworks-box,.exhibition-pros-box{border:1px solid var(--line);border-radius:14px;padding:14px;background:color-mix(in srgb,var(--panel) 94%,var(--accent) 6%)}
  .art-picker-search,.pro-picker-search{width:100%;margin:10px 0 8px}
  .art-picker-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:10px;max-height:420px;overflow:auto;padding:2px}.pro-picker-grid{display:flex;flex-direction:column;gap:8px;max-height:420px;overflow:auto;padding:2px}
  .art-pick-card,.pro-pick-card{display:flex;gap:12px;align-items:center;border:1px solid var(--line);border-radius:12px;padding:11px 12px;background:var(--panel);cursor:pointer}.pro-pick-card input[type=checkbox]{flex:0 0 22px;width:22px;height:22px;margin:0}.pro-pick-card .pro-pick-text{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:2px;text-align:left}.pro-pick-card .pro-pick-text strong{white-space:normal;word-break:break-word}.pro-pick-card .pro-pick-text small{color:var(--muted);white-space:normal;word-break:break-word}
  .art-pick-card:has(input:checked),.pro-pick-card:has(input:checked){outline:2px solid var(--accent);background:color-mix(in srgb,var(--panel) 88%,var(--accent) 12%)}
  .art-pick-thumb{width:58px;height:58px;flex:0 0 58px;border-radius:9px;overflow:hidden;display:grid;place-items:center;background:var(--soft)}
  .art-pick-thumb img{width:100%;height:100%;object-fit:cover}
  .art-pick-text,.pro-pick-text{min-width:0;display:flex;flex-direction:column;gap:3px}
  .art-pick-text strong,.pro-pick-text strong{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .art-pick-text small,.pro-pick-text small{color:var(--muted)}
  .new-pro-box{display:none;margin-top:12px;padding:12px;border:1px dashed var(--accent);border-radius:12px}
  .new-pro-box.open{display:block}
  `;document.head.appendChild(st);
}
function professionalPickerHtml(selectedIds=[]){
  const selected=new Set(selectedIds||[]);
  const pros=(db.pros||[]).map(p=>({...p,name:String(p.name||p.nome||p.fullName||p.title||'').trim(),role:p.role||p.ruolo||'Curatore / critico',org:p.org||p.organization||p.galleria||''})).filter(p=>p.id&&p.name).sort((a,b)=>a.name.localeCompare(b.name,'it'));
  const quick=pros.length?`<div class="field full"><label>Seleziona rapidamente un contatto già presente</label><select class="pro-picker-quick"><option value="">— Scegli curatore / critico —</option>${pros.map(p=>`<option value="${esc(p.id)}">${esc(p.name)}${p.role?' · '+esc(p.role):''}</option>`).join('')}</select></div>`:'';
  return `<div class="pro-picker" data-pro-picker="exhibitionPros">${quick}<input type="search" class="search pro-picker-search" 'Cerca curatore, critico, galleria, città, email…')}"><div class="pro-picker-count meta"></div><div class="pro-picker-grid">${pros.map(p=>`<label class="pro-pick-card" data-search="${esc([p.name,p.role,p.org,p.city,p.email].filter(Boolean).join(' ').toLowerCase())}"><input type="checkbox" name="professionalIds" value="${esc(p.id)}" ${selected.has(p.id)?'checked':''}><span class="pro-pick-text"><strong>${esc(p.name)}</strong><small>${esc([p.role,p.org,p.city,p.email].filter(Boolean).join(' · '))}</small></span></label>`).join('')||'<p class="meta">Nessun curatore o critico ancora registrato. Premi “Aggiungi nuovo”.</p>'}</div></div>`;
}
function bindProfessionalPicker(){
  const root=document.querySelector('[data-pro-picker="exhibitionPros"]');if(!root)return;
  const input=root.querySelector('.pro-picker-search'),quick=root.querySelector('.pro-picker-quick'),cards=[...root.querySelectorAll('.pro-pick-card')],count=root.querySelector('.pro-picker-count');
  const update=()=>{const terms=(input?.value||'').trim().toLowerCase().split(/\s+/).filter(Boolean);let shown=0,checked=0;cards.forEach(c=>{const ok=!terms.length||terms.every(t=>(c.dataset.search||'').includes(t));c.hidden=!ok;if(ok)shown++;if(c.querySelector('input').checked)checked++;});if(count)count.textContent=`${shown} contatti visualizzati · ${checked} selezionati`;};
  input?.addEventListener('input',update);root.addEventListener('change',update);
  quick?.addEventListener('change',()=>{if(!quick.value)return;const cb=cards.map(c=>c.querySelector('input')).find(x=>x.value===quick.value);if(cb){cb.checked=true;cb.closest('.pro-pick-card')?.scrollIntoView({block:'nearest'});}quick.value='';update();});
  update();
}
function exhibitionModal(x={}){
  ensureExhibitionEnhancementStyles();
  const arts=artworkPickerHtml(x.artworkIds||[],'exhibitionArts');
  const oldSelected=x.professionalIds?.length?x.professionalIds:(x.curatorId?[x.curatorId]:[]);
  const pros=professionalPickerHtml(oldSelected);
  openModal(x.id?'Modifica mostra':'Nuova mostra',`<div class="formgrid">
  ${field('Titolo','title',x.title,'text','full')}${field('Data inizio','startDate',x.startDate,'date')}${field('Data fine','endDate',x.endDate,'date')}${field('Luogo / galleria','venue',x.venue)}${field('Città','city',x.city)}
  <div class="field full exhibition-pros-box"><div class="row spread"><label>Curatori, critici e persone coinvolte</label><button type="button" class="btn" id="toggleNewExPro">＋ Aggiungi nuovo</button></div><small class="meta">I contatti già presenti in “Curatori e critici” vengono caricati qui automaticamente. Puoi selezionarne anche più di uno.</small>${pros}
    <div class="new-pro-box" id="newExProBox"><div class="formgrid">${field('Nome e cognome','newProName','','text','full')}<div class="field"><label>Ruolo</label><select name="newProRole">${PRO_RUOLI.map(r=>`<option>${esc(r)}</option>`).join('')}</select></div>${field('Galleria / istituzione','newProOrg','')}${field('Città','newProCity','')}${field('Email','newProEmail','','email')}${field('Telefono','newProPhone','','tel')}</div><small class="meta">Il nuovo contatto sarà salvato anche nella sezione Curatori e critici.</small></div>
  </div>
  <div class="field"><label>Gallerista / galleria</label><input name="gallerist" list="galleryList" value="${esc(x.gallerist||'')}"><datalist id="galleryList">${(db.galleries||[]).map(g=>`<option value="${esc(g.name||g.title||g.company||'')}">`).join('')}</datalist></div>${field('Stato','status',x.status||'In programma')}${area('Descrizione','description',x.description)}${area('Note organizzative','notes',x.notes)}
  <div class="field full"><label>Locandina della mostra</label><input name="poster" type="file" accept="image/*">${x.poster?`<div style="margin-top:8px"><img src="${x.poster}" style="max-width:160px;border-radius:8px;border:1px solid var(--line)"><label class="chkline" style="margin-top:6px"><input type="checkbox" name="rimuoviPoster"> Rimuovi locandina</label></div>`:''}</div>
  <div class="field full exhibition-artworks-box"><div class="row spread"><label>Opere partecipanti</label><span class="badge">Ricerca e selezione multipla</span></div>${arts}</div></div>`,async fd=>{
    const pf=fd.get('poster');const nuovoPoster=pf&&pf.size?await fileData(pf):(fd.get('rimuoviPoster')?'':x.poster||'');
    let professionalIds=fd.getAll('professionalIds');
    const newName=String(fd.get('newProName')||'').trim(),newEmail=String(fd.get('newProEmail')||'').trim();
    if(newEmail&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(newEmail)){alert('Inserisci un indirizzo email valido per il nuovo curatore o critico.');return;}
    if(newName){const np={id:uid(),name:newName,role:fd.get('newProRole')||'Curatore / critico',org:fd.get('newProOrg'),city:fd.get('newProCity'),email:newEmail,phone:fd.get('newProPhone'),created:new Date().toISOString(),updated:new Date().toISOString()};db.pros=db.pros||[];db.pros.unshift(np);professionalIds.push(np.id);}
    professionalIds=[...new Set(professionalIds)];
    const selectedPros=(db.pros||[]).filter(p=>professionalIds.includes(p.id));
    const curatorNames=selectedPros.map(p=>p.name||p.nome||'').filter(Boolean);
    const o={...x,id:x.id||uid(),title:fd.get('title'),startDate:fd.get('startDate'),endDate:fd.get('endDate'),venue:fd.get('venue'),city:fd.get('city'),professionalIds,curatorId:professionalIds[0]||'',curator:curatorNames.join(', '),gallerist:fd.get('gallerist'),status:fd.get('status'),description:fd.get('description'),notes:fd.get('notes'),poster:nuovoPoster,artworkIds:fd.getAll('arts'),updated:new Date().toISOString(),created:x.created||new Date().toISOString()};
    if(x.id)db.exhibitions=db.exhibitions.map(v=>v.id===x.id?o:v);else db.exhibitions.unshift(o);await save();modal.close();render();toast('Mostra salvata');
  });
  bindArtworkPicker('exhibitionArts');bindProfessionalPicker();
  const btn=document.getElementById('toggleNewExPro'),box=document.getElementById('newExProBox');btn?.addEventListener('click',()=>{box?.classList.toggle('open');if(box?.classList.contains('open'))box.querySelector('[name=newProName]')?.focus();});
}
function clientModal(c={}){openModal(c.id?'Modifica cliente':'Nuovo cliente',`<div class="formgrid">${field('Nome e cognome','name',c.name,'text','full')}${field('Azienda / galleria','company',c.company)}${field('Email','email',c.email,'email')}${field('Telefono','phone',c.phone)}${field('Città','city',c.city)}${field('Indirizzo','address',c.address,'text','full')}${area('Preferenze artistiche','preferences',c.preferences)}${area('Note private','notes',c.notes)}</div>`,async fd=>{const o={...c,id:c.id||uid(),name:fd.get('name'),company:fd.get('company'),email:fd.get('email'),phone:fd.get('phone'),city:fd.get('city'),address:fd.get('address'),preferences:fd.get('preferences'),notes:fd.get('notes'),updated:new Date().toISOString(),created:c.created||new Date().toISOString()};if(c.id)db.clients=db.clients.map(x=>x.id===c.id?o:x);else db.clients.unshift(o);await save();modal.close();render();toast('Cliente salvato')})}
function saleModal(s={}){openModal(s.id?'Modifica vendita':'Registra vendita',`<div class="formgrid"><div class="field"><label>Opera</label><select name="artworkId"><option value="">Seleziona opera</option>${optionList(db.artworks,s.artworkId)}</select></div><div class="field"><label>Cliente</label><select name="clientId"><option value="">Seleziona cliente</option>${optionList(db.clients,s.clientId)}</select></div>${field('Data','date',s.date||new Date().toISOString().slice(0,10),'date')}${field('Prezzo totale','total',s.total,'number')}${field('Importo incassato','paid',s.paid,'number')}${field('Metodo di pagamento','paymentMethod',s.paymentMethod||'Bonifico')}${field('Commissioni','commission',s.commission,'number')}${field('Consegna / spedizione','delivery',s.delivery,'text','full')}${area('Note','notes',s.notes)}</div>`,fd=>{const o={...s,id:s.id||uid(),artworkId:fd.get('artworkId'),clientId:fd.get('clientId'),date:fd.get('date'),total:fd.get('total'),paid:fd.get('paid'),paymentMethod:fd.get('paymentMethod'),commission:fd.get('commission'),delivery:fd.get('delivery'),notes:fd.get('notes'),updated:new Date().toISOString(),created:s.created||new Date().toISOString()};if(s.id)db.sales=db.sales.map(x=>x.id===s.id?o:x);else db.sales.unshift(o);const art=db.artworks.find(a=>a.id===o.artworkId);if(art&&Number(o.paid)>=Number(o.total)&&Number(o.total)>0)art.status='Venduto';save();modal.close();render();toast('Vendita salvata')})}
function agendaModal(x={}){openModal(x.id?'Modifica evento':'Nuovo evento',`<div class="formgrid">${field('Titolo','title',x.title,'text','full')}<div class="field"><label>Tipo</label><select name="type">${['Appuntamento','Mostra','Consegna','Scadenza','Promemoria','Altro'].map(v=>`<option ${x.type===v?'selected':''}>${v}</option>`).join('')}</select></div>${field('Data','date',x.date||new Date().toISOString().slice(0,10),'date')}${field('Ora','time',x.time,'time')}${field('Luogo','location',x.location)}${area('Note','notes',x.notes)}</div>`,fd=>{const o={...x,id:x.id||uid(),title:fd.get('title'),type:fd.get('type'),date:fd.get('date'),time:fd.get('time'),location:fd.get('location'),notes:fd.get('notes'),updated:new Date().toISOString(),created:x.created||new Date().toISOString()};if(x.id)db.agenda=db.agenda.map(v=>v.id===x.id?o:v);else db.agenda.unshift(o);save();modal.close();render();toast('Evento salvato')})}
function catalogFromExhibition(id){const x=db.exhibitions.find(v=>v.id===id);if(!x)return;const p={id:uid(),title:x.title||'Catalogo mostra',subtitle:[x.venue,x.city].filter(Boolean).join(' · '),type:'Catalogo esposizione',theme:'Museo',intro:x.description||'',fields:['year','technique','dimensions','description','status','code'],artworkIds:x.artworkIds||[],created:new Date().toISOString()};db.pdfProjects.unshift(p);save();previewId=p.id;route='pdfpreview';render();toast('Catalogo creato')}
function printReceipt(id){const s=db.sales.find(x=>x.id===id);if(!s)return;window.__PDFCTX__={tipo:'ricevuta',dato:s};docViewerOpen('Ricevuta vendita',receiptDocHtml(s),'',receiptPlain(s))}
function exportAgendaIcs(){
  const dt=x=>{const d=String(x.date||'').replaceAll('-','');const t=x.time?'T'+x.time.replace(':','')+'00':'';return d+t;};
  const esc2=t=>String(t||'').replace(/\\/g,'\\\\').replace(/[,;]/g,' ').replace(/\r?\n/g,'\\n');
  if(!db.agenda.length){toast('Agenda vuota');return}
  const body=db.agenda.map(x=>'BEGIN:VEVENT\r\nUID:'+x.id+'@mairgo.local\r\nDTSTAMP:'+new Date().toISOString().replace(/[-:]/g,'').split('.')[0]+'Z\r\nDTSTART:'+dt(x)+'\r\nSUMMARY:'+esc2(x.title)+'\r\nLOCATION:'+esc2(x.location)+'\r\nDESCRIPTION:'+esc2(x.notes)+'\r\nEND:VEVENT').join('\r\n');
  const ics='BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//MAIR GO!//IT\r\nCALSCALE:GREGORIAN\r\n'+body+'\r\nEND:VCALENDAR';
  salvaFile('MAIR_GO_Agenda.ics',ics,'text/calendar');
}

/* ===== USCITA E CHIUSURA OVERLAY ===== */
function chiudiOverlay(){
  let chiuso=false;
  ['docviewer','txteditor','socialview','diagbox'].forEach(id=>{
    const e=document.getElementById(id);if(e){e.remove();chiuso=true;}
  });
  ['docviewer-css','txteditor-css'].forEach(id=>{const e=document.getElementById(id);if(e)e.remove();});
  document.querySelectorAll('[data-overlay]').forEach(e=>{e.remove();chiuso=true;});
  try{if(modal&&modal.open){modal.close();chiuso=true;}}catch(e){}
  return chiuso;
}
function esciApp(){
  if(!confirm('Vuoi chiudere MAIR GO!?'))return;
  try{
    const Cap=window.Capacitor;
    const App=Cap&&Cap.Plugins&&Cap.Plugins.App;
    if(App&&App.exitApp){App.exitApp();return;}
  }catch(e){diagLog('ESCI',e&&e.message?e.message:String(e));}
  try{window.close();}catch(e){}
  toast('Usa il tasto Indietro del telefono per uscire');
}
// tasto indietro fisico di Android
document.addEventListener('DOMContentLoaded',()=>{
  try{
    const Cap=window.Capacitor;
    const App=Cap&&Cap.Plugins&&Cap.Plugins.App;
    if(App&&App.addListener){
      App.addListener('backButton',()=>{
        if(chiudiOverlay())return;
        if(route&&route!=='home'){go('home');return;}
        esciApp();
      });
    }
  }catch(e){}
});


/* ===== DATI D'ESEMPIO (leggeri, cancellabili) ===== */
function generaImmagineDemo(testo,c1,c2){
  // genera un'immagine SVG leggera (pochi byte) come data URL
  const svg='<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450">'
    +'<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">'
    +'<stop offset="0" stop-color="'+c1+'"/><stop offset="1" stop-color="'+c2+'"/></linearGradient></defs>'
    +'<rect width="600" height="450" fill="url(#g)"/>'
    +'<circle cx="300" cy="200" r="90" fill="rgba(255,255,255,.18)"/>'
    +'<text x="300" y="230" font-family="Georgia,serif" font-size="52" fill="rgba(255,255,255,.92)" text-anchor="middle">'+testo+'</text>'
    +'<text x="300" y="410" font-family="system-ui,sans-serif" font-size="20" fill="rgba(255,255,255,.7)" text-anchor="middle">MAIR GO! · esempio</text>'
    +'</svg>';
  return 'data:image/svg+xml;base64,'+btoa(unescape(encodeURIComponent(svg)));
}
function caricaDatiEsempio(){
  const oggi=new Date();
  const iso=(g)=>{const d=new Date(oggi);d.setDate(d.getDate()+g);return d.toISOString();};
  const isoData=(g)=>iso(g).slice(0,10);
  const marca='__demo__'; // marchio per riconoscere e cancellare i dati d'esempio

  // 5 OPERE con immagini leggere
  const opere=[
    {titolo:'Vortice n.1',anno:'2024',tec:'Olio su tela',dim:'80 × 100 cm',prezzo:'2500',stato:'Disponibile',c:['#3a4a7a','#8a6a1f'],desc:'Opera della serie sul vortice, motivo centrale della ricerca.'},
    {titolo:'Silenzio interiore',anno:'2023',tec:'Acrilico su tela',dim:'60 × 80 cm',prezzo:'1800',stato:'Disponibile',c:['#6a2a3a','#c98a4a'],desc:'Studio sull\u2019introversione e sul non detto.'},
    {titolo:'Spirale rossa',anno:'2024',tec:'Tecnica mista',dim:'100 × 100 cm',prezzo:'3200',stato:'Venduto',c:['#8a2a2a','#e0a030'],desc:'Grande formato, spirale logaritmica dominante.'},
    {titolo:'Frammento d\u2019inconscio',anno:'2022',tec:'Olio su tavola',dim:'40 × 50 cm',prezzo:'1200',stato:'Disponibile',c:['#2a5a4a','#a0c060'],desc:'Piccolo formato intimo.'},
    {titolo:'Notturno',anno:'2023',tec:'Olio su tela',dim:'70 × 90 cm',prezzo:'2100',stato:'Disponibile',c:['#1a2a4a','#5a6a9a'],desc:'Atmosfera notturna, toni profondi.'}
  ];
  const idsOpere=[];
  opere.forEach((o,i)=>{
    const img=generaImmagineDemo(String(i+1),o.c[0],o.c[1]);
    const id=uid();idsOpere.push(id);
    db.artworks.push({id,title:o.titolo,year:o.anno,technique:o.tec,dimensions:o.dim,
      price:o.prezzo,status:o.stato,description:o.desc,image:img,thumb:img,
      demo:marca,updated:new Date().toISOString(),created:new Date().toISOString()});
  });

  // 1 CURATORE
  const idCur=uid();
  db.pros.push({id:idCur,name:'Elena Rossi',role:'Curatore',org:'Studio d\u2019Arte Contemporanea',
    city:'Milano',email:'elena.rossi@esempio.it',phone:'+39 02 1234567',demo:marca,
    updated:new Date().toISOString(),created:new Date().toISOString()});

  // 1 GALLERIA
  const idGal=uid();
  db.galleries.push({id:idGal,name:'Galleria Le Muse',type:'Galleria privata',city:'Torino',
    address:'Via Roma 12',manager:'Marco Bianchi',email:'info@lemuse.esempio.it',
    phone:'+39 011 7654321',demo:marca,updated:new Date().toISOString(),created:new Date().toISOString()});

  // 1 CLIENTE
  const idCli=uid();
  db.clients.push({id:idCli,name:'Giovanni Verdi',company:'Collezione privata',city:'Roma',
    email:'g.verdi@esempio.it',phone:'+39 06 9876543',preferences:'Predilige i grandi formati.',
    demo:marca,updated:new Date().toISOString(),created:new Date().toISOString()});

  // 1 VENDITA (collegata all'opera "Spirale rossa" e al cliente)
  db.sales.push({id:uid(),artworkId:idsOpere[2],clientId:idCli,total:'3200',
    method:'Bonifico',date:isoData(-30),status:'Saldato',demo:marca,
    updated:new Date().toISOString(),created:new Date().toISOString()});

  // 1 MOSTRA
  db.exhibitions.push({id:uid(),title:'Il Vortice dell\u2019Anima',venue:'Galleria Le Muse',
    city:'Torino',startDate:isoData(15),endDate:isoData(45),curator:'Elena Rossi',
    artworkIds:[idsOpere[0],idsOpere[1]],status:'In programma',demo:marca,
    updated:new Date().toISOString(),created:new Date().toISOString()});

  // 1 PROGETTO PDF (catalogo d'esempio)
  db.pdfProjects.unshift({id:uid(),title:'Catalogo 2024',subtitle:db.settings.artist||'',
    type:'Portfolio',theme:'Atelier',intro:'Una selezione delle opere recenti.',
    fields:['year','technique','dimensions','price','status'],
    artworkIds:[idsOpere[0],idsOpere[1],idsOpere[3]],demo:marca,created:new Date().toISOString()});

  // 2 APPUNTAMENTI in agenda
  db.agenda.push({id:uid(),title:'Incontro con la curatrice Elena Rossi',date:isoData(3),
    time:'15:00',location:'Milano',demo:marca,updated:new Date().toISOString(),created:new Date().toISOString()});
  db.agenda.push({id:uid(),title:'Consegna opera a Galleria Le Muse',date:isoData(10),
    time:'10:30',location:'Torino',demo:marca,updated:new Date().toISOString(),created:new Date().toISOString()});

  save();
}
function haDatiEsempio(){
  const sez=['artworks','pros','galleries','clients','sales','exhibitions','agenda','pdfProjects','workspaces','certificates'];
  return sez.some(k=>(db[k]||[]).some(x=>x&&x.demo==='__demo__'));
}
function cancellaDatiEsempio(){
  if(!confirm('Rimuovere tutti i dati d\u2019esempio?\n\nLe voci che hai aggiunto tu resteranno intatte.'))return;
  const sez=['artworks','pros','galleries','clients','sales','exhibitions','agenda','pdfProjects','workspaces','certificates'];
  sez.forEach(k=>{if(Array.isArray(db[k]))db[k]=db[k].filter(x=>!(x&&x.demo==='__demo__'));});
  save();render();toast('Dati d\u2019esempio rimossi');
}


/* ===== GIRO GUIDATO PRIMO AVVIO ===== */
function giroGuidato(){
  if(db.settings.tourFatto)return;
  const passi=[
    {ic:'🎨',t:'La tua Home',d:'Qui vedi a colpo d\u2019occhio le statistiche del tuo archivio e le azioni rapide. Il riquadro "Da fare" ti ricorda gli impegni in scadenza.'},
    {ic:'◫',t:'Archivio e Opere',d:'Il cuore dell\u2019app. Ogni opera ha immagine, scheda completa, prezzo e stato. Puoi filtrare, cercare e toccare un\u2019immagine per vederla intera.'},
    {ic:'＋',t:'Crea nuovo',d:'Da qui aggiungi in un tocco: opere, certificati, cataloghi PDF, documenti, clienti, curatori.'},
    {ic:'◷',t:'Attività',d:'Agenda, mostre, clienti, vendite e la timeline di tutto ciò che accade nel tuo atelier.'},
    {ic:'☰',t:'Altro',d:'Zona Social, link utili, gallerie, impostazioni, esportazione dati, guida e backup. Esplora con calma.'},
    {ic:'💾',t:'Il backup è sacro',d:'I dati stanno solo sul tuo telefono. Fai regolarmente un backup da Impostazioni e salvalo altrove (Drive, email): è l\u2019unico modo per non perderli.'}
  ];
  let i=0;
  const ov=document.createElement('div');
  ov.id='tourOverlay';
  ov.style.cssText='position:fixed;inset:0;z-index:99997;background:rgba(15,12,10,.82);display:flex;align-items:center;justify-content:center;padding:24px;backdrop-filter:blur(3px)';
  document.body.appendChild(ov);
  const mostra=()=>{
    const p=passi[i];
    ov.innerHTML='<div style="max-width:420px;width:100%;background:var(--panel,#fff);border-radius:20px;padding:30px 26px;box-shadow:0 20px 70px rgba(0,0,0,.6);text-align:center">'
      +'<div style="font-size:3rem;margin-bottom:10px">'+p.ic+'</div>'
      +'<h2 style="margin:0 0 10px;font-family:Georgia,serif">'+T(p.t)+'</h2>'
      +'<p style="margin:0 0 22px;color:var(--muted,#777);line-height:1.6">'+T(p.d)+'</p>'
      +'<div style="display:flex;gap:6px;justify-content:center;margin-bottom:18px">'
      + passi.map((_,k)=>'<span style="width:8px;height:8px;border-radius:50%;background:'+(k===i?'var(--accent,#8a6a1f)':'var(--line,#ccc)')+'"></span>').join('')
      +'</div>'
      +'<div style="display:flex;gap:10px">'
      +(i>0?'<button id="tPrev" class="btn" style="flex:1">'+T('Indietro')+'</button>':'')
      +'<button id="tNext" class="btn primary" style="flex:2">'+(i<passi.length-1?T('Avanti'):T('Inizia a usare l\u2019app'))+'</button>'
      +'</div>'
      +'<button id="tSkip" class="btn ghost" style="width:100%;margin-top:8px;font-size:.85rem">'+T('Salta il tour')+'</button>'
      +'</div>';
    const next=ov.querySelector('#tNext');if(next)next.onclick=()=>{if(i<passi.length-1){i++;mostra();}else fine();};
    const prev=ov.querySelector('#tPrev');if(prev)prev.onclick=()=>{if(i>0){i--;mostra();}};
    const skip=ov.querySelector('#tSkip');if(skip)skip.onclick=fine;
  };
  const fine=()=>{db.settings.tourFatto=true;save();ov.remove();};
  mostra();
}

/* ===== PRIMO AVVIO ===== */
function primoAvvio(){
  if(db.settings.configurato)return false;
  const h=document.createElement('div');
  h.setAttribute('data-overlay','benvenuto');
  h.setAttribute('style','position:fixed;top:0;left:0;right:0;bottom:0;z-index:99998;background:var(--bg,#1a1712);display:flex;align-items:center;justify-content:center;padding:20px;overflow:auto');
  h.innerHTML='<div style="max-width:440px;width:100%;background:var(--panel,#fff);border-radius:16px;padding:26px;box-shadow:0 10px 50px rgba(0,0,0,.5)">'
    +'<div style="text-align:center;margin-bottom:20px">'
    +'<div style="width:64px;height:64px;margin:0 auto 12px;border-radius:16px;background:#8a6a1f;color:#fff;display:grid;place-items:center;font:900 2rem Georgia,serif">M</div>'
    +'<h2 style="margin:0 0 6px">Benvenuto in MAIR GO!</h2>'
    +'<p style="margin:0;color:var(--muted,#888);font-size:.92rem">Prima di iniziare, due informazioni per personalizzare l\u2019app.</p></div>'
    +'<div class="field"><label>Nome artista o atelier *</label><input id="bvNome" type="text" placeholder="Es. Maurizio D\u2019Andrea" autocomplete="name"></div>'
    +'<div class="field"><label>Email (facoltativa)</label><input id="bvEmail" type="email" placeholder="per contatti e documenti"></div>'
    +'<div class="field"><label>Telefono (facoltativo)</label><input id="bvTel" type="tel"></div>'
    +'<div style="background:color-mix(in srgb,#c98a1f 12%,transparent);border-radius:10px;padding:12px;margin:16px 0;font-size:.86rem;line-height:1.5">'
    +'<strong>&#9888;&#65039; Importante</strong><br>I dati restano solo sul tuo dispositivo: nessuno pu\u00f2 leggerli, ma nessuno pu\u00f2 restituirteli se li perdi. Fai regolarmente il <strong>backup</strong> da Impostazioni.</div>'
    +'<label style="display:flex;align-items:center;gap:10px;margin:4px 0 14px;font-size:.9rem;cursor:pointer"><input type="checkbox" id="bvEsempio" checked style="width:20px;height:20px"> Carica alcuni <strong>dati d\u2019esempio</strong> (cancellabili quando vuoi)</label>'+'<button id="bvOk" class="btn primary" style="width:100%;padding:14px">Inizia</button>'
    +'<button id="bvSalta" class="btn" style="width:100%;margin-top:8px">Salta per ora</button>'
    +'</div>';
  document.body.appendChild(h);
  const chiudi=(salva)=>{
    if(salva){
      const n=h.querySelector('#bvNome').value.trim();
      if(!n){alert('Inserisci il nome artista.');return;}
      db.settings.artist=n;
      const e=h.querySelector('#bvEmail').value.trim();if(e)db.settings.email=e;
      const t=h.querySelector('#bvTel').value.trim();if(t)db.settings.phone=t;
    }
    const vuoleEsempio=salva && h.querySelector('#bvEsempio') && h.querySelector('#bvEsempio').checked;
    db.settings.configurato=true;save();h.remove();
    if(vuoleEsempio){try{caricaDatiEsempio();toast('Dati d\u2019esempio caricati');}catch(e){diagLog('DEMO',e&&e.message?e.message:String(e));alert('Non ho potuto caricare i dati d\u2019esempio: '+(e&&e.message?e.message:e));}}
    render();
    if(salva&&!vuoleEsempio)toast('Benvenuto, '+db.settings.artist+'!');
    // giro guidato subito dopo
    setTimeout(()=>{try{giroGuidato();}catch(e){}},500);
  };
  h.querySelector('#bvOk').onclick=()=>chiudi(true);
  h.querySelector('#bvSalta').onclick=()=>chiudi(false);
  setTimeout(()=>{try{h.querySelector('#bvNome').focus()}catch(e){}},300);
  return true;
}

/* ===================== LINK UTILI ===================== */
const LINK_CAT_DEFAULT=['Arte','Riviste','Concorsi','Musei','Gallerie','Fiere','Materiali','Formazione'];
function linkCats(){const c=db.settings.linkCategories;return (c&&c.length)?c:LINK_CAT_DEFAULT;}

function linksView(){
  const cats=linkCats();
  const perCat={};cats.forEach(c=>perCat[c]=[]);
  (db.links||[]).forEach(l=>{const c=cats.includes(l.category)?l.category:(cats[0]||'Arte');(perCat[c]=perCat[c]||[]).push(l);});
  const blocchi=cats.map(c=>{
    const arr=(perCat[c]||[]).sort((a,b)=>String(a.title||'').localeCompare(String(b.title||'')));
    return '<section class="link-cat"><div class="row spread"><h3>'+esc(c)+' <span class="badge">'+arr.length+'</span></h3></div>'
      +(arr.length?'<div class="link-list">'+arr.map(l=>'<article class="link-row">'
        +'<a class="link-main" href="'+esc(l.url)+'" target="_blank" rel="noopener"><span class="link-ico">&#128279;</span><span><strong>'+esc(l.title||l.url)+'</strong>'+(l.notes?'<small>'+esc(l.notes)+'</small>':'')+'<small class="link-url">'+esc(l.url)+'</small></span></a>'
        +'<div class="link-act"><button class="btn" data-action="editLink" data-id="'+l.id+'">Modifica</button><button class="btn danger" data-action="deleteLink" data-id="'+l.id+'">&times;</button></div>'
        +'</article>').join('')+'</div>'
        :'<p class="meta">Nessun link in questa categoria.</p>')
      +'</section>';
  }).join('');
  return section('Link utili','<button class="btn primary" data-action="newLink">&#65291; Nuovo link</button>')
   +'<section class="hero"><h2>&#128279; Link utili per l\u2019arte</h2><p>Raccolta personale di siti, riviste, bandi e risorse. Tocca un link per aprirlo.</p></section>'
   +'<div class="toolbar"><input id="linkSearch" class="search" placeholder="Cerca per titolo, indirizzo, nota, categoria…"></div>'
   +'<div class="row" style="gap:8px;flex-wrap:wrap;margin-bottom:16px">'
     +'<button class="btn" data-action="manageLinkCats">&#9881;&#65039; Categorie</button>'
     +'<button class="btn" data-action="printLinks">&#128196; Stampa PDF</button>'
   +'</div>'
   +'<div id="linkGrid">'+((db.links||[]).length?blocchi:empty('&#128279;','Nessun link salvato.','<button class="btn primary" data-action="newLink">Aggiungi il primo link</button>'))+'</div>';
}
function linkModal(l={}){
  const cats=linkCats();
  openModal(l.id?'Modifica link':'Nuovo link','<div class="formgrid">'
    +field('Titolo','title',l.title,'text','full')
    +field('Indirizzo web (URL)','url',l.url||'https://','url','full')
    +'<div class="field full"><label>Categoria</label><select name="category">'+cats.map(c=>'<option value="'+esc(c)+'"'+(l.category===c?' selected':'')+'>'+esc(c)+'</option>').join('')+'</select></div>'
    +area('Note','notes',l.notes)
  +'</div>',fd=>{
    let url=String(fd.get('url')||'').trim();
    if(url&&!/^https?:\/\//i.test(url))url='https://'+url;
    if(!url){toast('Inserisci un indirizzo');return}
    const o={...l,id:l.id||uid(),title:fd.get('title')||url,url,category:fd.get('category'),notes:fd.get('notes'),
      updated:new Date().toISOString(),created:l.created||new Date().toISOString()};
    db.links=db.links||[];
    if(l.id)db.links=db.links.map(x=>x.id===l.id?o:x);else db.links.unshift(o);
    save();modal.close();render();toast('Link salvato');
  });
}
function linkCatsModal(){
  const cats=linkCats();
  openModal('Categorie dei link','<div class="formgrid">'
    +'<div class="field full"><label>Una categoria per riga. Cancella una riga per eliminarla.</label>'
    +'<textarea name="cats" rows="10">'+esc(cats.join('\n'))+'</textarea></div>'
    +'<p class="meta full">I link di una categoria eliminata restano e vengono spostati nella prima categoria.</p>'
  +'</div>',fd=>{
    const nuove=String(fd.get('cats')||'').split('\n').map(x=>x.trim()).filter(Boolean);
    if(!nuove.length){toast('Serve almeno una categoria');return}
    db.settings.linkCategories=nuove;
    (db.links||[]).forEach(l=>{if(!nuove.includes(l.category))l.category=nuove[0];});
    save();modal.close();render();toast('Categorie aggiornate');
  });
}
function linksDocHtml(){
  const cats=linkCats();
  const col=(pdfCfg().colore)||'#8a6a1f';
  let out='<h1 style="margin:0 0 4px">Link utili</h1><p style="color:#666;margin:0 0 18px">'+esc(db.settings.artist||'')+' &middot; '+new Date().toLocaleDateString('it-IT')+'</p>';
  cats.forEach(c=>{
    const arr=(db.links||[]).filter(l=>l.category===c);
    if(!arr.length)return;
    out+='<h2 style="color:'+col+';border-bottom:2px solid '+col+';padding-bottom:6px;margin:22px 0 10px">'+esc(c)+'</h2><table style="width:100%;border-collapse:collapse">';
    arr.forEach(l=>{out+='<tr><td style="padding:8px;border-bottom:1px solid #e5e5e5"><strong>'+esc(l.title||'')+'</strong>'
      +(l.notes?'<br><span style="color:#666;font-size:.9em">'+esc(l.notes)+'</span>':'')
      +'<br><span style="color:'+col+';font-size:.88em">'+esc(l.url)+'</span></td></tr>';});
    out+='</table>';
  });
  return out;
}
function linksPlain(){
  const cats=linkCats();let t='LINK UTILI\n'+(db.settings.artist||'')+'\n\n';
  cats.forEach(c=>{const arr=(db.links||[]).filter(l=>l.category===c);if(!arr.length)return;
    t+='== '+c+' ==\n'+arr.map(l=>'\u2022 '+(l.title||'')+'\n  '+l.url+(l.notes?'\n  '+l.notes:'')).join('\n')+'\n\n';});
  return t;
}

/* ===================== CONTATTI PROFESSIONALI ===================== */
const PRO_RUOLI=['Curatore','Gallerista','Critico d\u2019arte','Giornalista','Collezionista','Organizzatore','Fotografo','Altro'];
function proView(){
  const list=(db.pros||[]);
  return section('Curatori e critici','<button class="btn primary" data-action="newPro">&#65291; Nuovo contatto</button>')
   +'<section class="hero"><h2>&#128100; Curatori, gallerie e critici</h2><p>Rubrica dei contatti professionali del mondo dell\u2019arte, con foto, recapiti e profili social.</p></section>'
   +'<div class="toolbar"><input id="proSearch" class="search" placeholder="Cerca per nome, ruolo, galleria, città, telefono, email…"Cerca per nome, ruolo, galleria, citt\\u00e0, telefono, email\\u2026")}"><select id="proRole"><option value="">Tutti i ruoli</option>'+PRO_RUOLI.map(r=>'<option>'+r+'</option>').join('')+'</select></div>'
   +'<div class="row" style="margin-bottom:16px"><button class="btn" data-action="printPros">&#128196; Stampa PDF</button></div>'
   +'<div id="proGrid" class="grid">'+(list.length?list.map(proCard).join(''):empty('&#128100;','Nessun contatto professionale.','<button class="btn primary" data-action="newPro">Aggiungi il primo</button>'))+'</div>';
}
function proCard(p){
  const rec=[];
  if(p.phone)rec.push('<a href="tel:'+esc(p.phone)+'">&#128222; '+esc(p.phone)+'</a>');
  if(p.email)rec.push('<a href="mailto:'+esc(p.email)+'">&#9993;&#65039; '+esc(p.email)+'</a>');
  if(p.website)rec.push('<a href="'+esc(p.website)+'" target="_blank" rel="noopener">&#127760; Sito</a>');
  const soc=[];
  ['instagram','facebook','linkedin','altro'].forEach(k=>{if(p[k])soc.push('<a href="'+esc(p[k])+'" target="_blank" rel="noopener">'+k.charAt(0).toUpperCase()+k.slice(1)+'</a>');});
  return '<article class="card">'+(p.photo?'<img src="'+p.photo+'" alt="" style="width:100%;height:170px;object-fit:cover;border-radius:12px 12px 0 0">':'')
   +'<div class="cardbody"><div class="row spread"><h3>'+esc(p.name||'Senza nome')+'</h3><span class="badge">'+esc(p.role||'Altro')+'</span></div>'
   +(p.org?'<p class="meta">'+esc(p.org)+(p.city?' &middot; '+esc(p.city):'')+'</p>':(p.city?'<p class="meta">'+esc(p.city)+'</p>':''))
   +(rec.length?'<p class="link-inline">'+rec.join(' &nbsp;')+'</p>':'')
   +(soc.length?'<p class="link-inline">'+soc.join(' &nbsp;')+'</p>':'')
   +(p.notes?'<p>'+esc(p.notes)+'</p>':'')
   +'<div class="row" style="margin-top:10px"><button class="btn" data-action="editPro" data-id="'+p.id+'">Modifica</button><button class="btn danger" data-action="deletePro" data-id="'+p.id+'">Elimina</button></div>'
   +'</div></article>';
}
function proModal(p={}){
  openModal(p.id?'Modifica contatto':'Nuovo contatto professionale','<div class="formgrid">'
    +field('Nome e cognome','name',p.name,'text','full')
    +'<div class="field"><label>Ruolo</label><select name="role">'+PRO_RUOLI.map(r=>'<option'+(p.role===r?' selected':'')+'>'+r+'</option>').join('')+'</select></div>'
    +field('Galleria / istituzione','org',p.org)
    +field('Citt\u00e0','city',p.city)
    +field('Telefono','phone',p.phone,'tel')
    +field('Email','email',p.email,'email')
    +field('Sito web','website',p.website,'url','full')
    +field('Instagram','instagram',p.instagram,'url')
    +field('Facebook','facebook',p.facebook,'url')
    +field('LinkedIn','linkedin',p.linkedin,'url')
    +field('Altro social','altro',p.altro,'url')
    +'<div class="field full"><label>Fotografia</label><input name="photo" type="file" accept="image/*">'+(p.photo?'<div style="margin-top:8px"><img src="'+p.photo+'" style="max-width:130px;border-radius:8px"><label class="chkline" style="margin-top:6px"><input type="checkbox" name="rimuoviFoto"> Rimuovi foto</label></div>':'')+'</div>'
    +area('Note','notes',p.notes)
  +'</div>',async fd=>{
    const f=fd.get('photo');
    let foto=p.photo||'';if(f&&f.size){try{const r=await processImage(f);foto=r.full;}catch(err){alert(err.message);return;}}else if(fd.get('rimuoviFoto')){foto='';}
    const norm=u=>{u=String(u||'').trim();return u&&!/^https?:\/\//i.test(u)?'https://'+u:u;};
    const o={...p,id:p.id||uid(),name:fd.get('name'),role:fd.get('role'),org:fd.get('org'),city:fd.get('city'),
      phone:fd.get('phone'),email:fd.get('email'),website:norm(fd.get('website')),
      instagram:norm(fd.get('instagram')),facebook:norm(fd.get('facebook')),linkedin:norm(fd.get('linkedin')),altro:norm(fd.get('altro')),
      photo:foto,notes:fd.get('notes'),updated:new Date().toISOString(),created:p.created||new Date().toISOString()};
    db.pros=db.pros||[];
    if(p.id)db.pros=db.pros.map(x=>x.id===p.id?o:x);else db.pros.unshift(o);
    save();modal.close();render();toast('Contatto salvato');
  });
}
function prosDocHtml(){
  const col=(pdfCfg().colore)||'#8a6a1f';
  let out='<h1 style="margin:0 0 4px">Curatori, gallerie e critici</h1><p style="color:#666;margin:0 0 18px">'+esc(db.settings.artist||'')+' &middot; '+new Date().toLocaleDateString('it-IT')+'</p>';
  (db.pros||[]).forEach(p=>{
    out+='<div style="border-bottom:1px solid #e5e5e5;padding:12px 0"><strong style="font-size:1.05em">'+esc(p.name||'')+'</strong> <span style="color:'+col+'">&middot; '+esc(p.role||'')+'</span>'
      +(p.org?'<br>'+esc(p.org):'')+(p.city?' &middot; '+esc(p.city):'')
      +(p.phone?'<br>Tel: '+esc(p.phone):'')+(p.email?'<br>Email: '+esc(p.email):'')
      +(p.website?'<br>'+esc(p.website):'')+(p.notes?'<br><span style="color:#666">'+esc(p.notes)+'</span>':'')+'</div>';
  });
  return out;
}
function prosPlain(){return 'CURATORI, GALLERIE E CRITICI\n\n'+(db.pros||[]).map(p=>[p.name,p.role,p.org,p.city,p.phone,p.email,p.website].filter(Boolean).join(' \u00b7 ')).join('\n');}

/* ===================== GALLERIE ===================== */
function galleriesView(){
  const list=db.galleries||[];
  return section('Gallerie','<button class="btn primary" data-action="newGallery">&#65291; Nuova galleria</button>')
   +'<section class="hero"><h2>&#127963;&#65039; Gallerie</h2><p>Spazi espositivi con immagine, referente, recapiti e sito.</p></section>'
   +'<div class="toolbar"><input id="gallerySearch" class="search" placeholder="Cerca per nome, città, referente, telefono, email…"></div>'
   +'<div class="row" style="margin-bottom:16px"><button class="btn" data-action="printGalleries">&#128196; Stampa PDF</button></div>'
   +'<div id="galleryGrid" class="grid">'+(list.length?list.map(galleryCard).join(''):empty('&#127963;&#65039;','Nessuna galleria salvata.','<button class="btn primary" data-action="newGallery">Aggiungi la prima</button>'))+'</div>';
}
function galleryCard(g){
  const rec=[];
  if(g.phone)rec.push('<a href="tel:'+esc(g.phone)+'">&#128222; '+esc(g.phone)+'</a>');
  if(g.email)rec.push('<a href="mailto:'+esc(g.email)+'">&#9993;&#65039; '+esc(g.email)+'</a>');
  if(g.website)rec.push('<a href="'+esc(g.website)+'" target="_blank" rel="noopener">&#127760; Sito</a>');
  return '<article class="card">'+(g.image?'<img src="'+g.image+'" alt="" style="width:100%;height:180px;object-fit:cover;border-radius:12px 12px 0 0">':'')
   +'<div class="cardbody"><div class="row spread"><h3>'+esc(g.name||'Senza nome')+'</h3>'+(g.type?'<span class="badge">'+esc(g.type)+'</span>':'')+'</div>'
   +((g.address||g.city)?'<p class="meta">'+esc([g.address,g.city].filter(Boolean).join(', '))+'</p>':'')
   +(g.manager?'<p><strong>Referente:</strong> '+esc(g.manager)+(g.managerRole?' ('+esc(g.managerRole)+')':'')+'</p>':'')
   +(rec.length?'<p class="link-inline">'+rec.join(' &nbsp;')+'</p>':'')
   +(g.notes?'<p>'+esc(g.notes)+'</p>':'')
   +'<div class="row" style="margin-top:10px"><button class="btn" data-action="editGallery" data-id="'+g.id+'">Modifica</button><button class="btn danger" data-action="deleteGallery" data-id="'+g.id+'">Elimina</button></div>'
   +'</div></article>';
}
function galleryModal(g={}){
  openModal(g.id?'Modifica galleria':'Nuova galleria','<div class="formgrid">'
    +field('Nome della galleria','name',g.name,'text','full')
    +'<div class="field"><label>Tipologia</label><select name="type">'+['Galleria privata','Spazio pubblico','Museo','Fondazione','Associazione','Fiera','Altro'].map(t=>'<option'+(g.type===t?' selected':'')+'>'+t+'</option>').join('')+'</select></div>'
    +field('Citt\u00e0','city',g.city)
    +field('Indirizzo','address',g.address,'text','full')
    +field('Nome referente','manager',g.manager)
    +field('Ruolo referente','managerRole',g.managerRole)
    +field('Telefono','phone',g.phone,'tel')
    +field('Email','email',g.email,'email')
    +field('Sito web','website',g.website,'url','full')
    +field('Instagram','instagram',g.instagram,'url','full')
    +'<div class="field full"><label>Immagine della galleria</label><input name="image" type="file" accept="image/*">'+(g.image?'<div style="margin-top:8px"><img src="'+g.image+'" style="max-width:150px;border-radius:8px"><label class="chkline" style="margin-top:6px"><input type="checkbox" name="rimuoviImg"> Rimuovi immagine</label></div>':'')+'</div>'
    +area('Note','notes',g.notes)
  +'</div>',async fd=>{
    const f=fd.get('image');
    let gimg=g.image||'';if(f&&f.size){try{const r=await processImage(f);gimg=r.full;}catch(err){alert(err.message);return;}}else if(fd.get('rimuoviImg')){gimg='';}
    const norm=u=>{u=String(u||'').trim();return u&&!/^https?:\/\//i.test(u)?'https://'+u:u;};
    const o={...g,id:g.id||uid(),name:fd.get('name'),type:fd.get('type'),city:fd.get('city'),address:fd.get('address'),
      manager:fd.get('manager'),managerRole:fd.get('managerRole'),phone:fd.get('phone'),email:fd.get('email'),
      website:norm(fd.get('website')),instagram:norm(fd.get('instagram')),image:gimg,notes:fd.get('notes'),
      updated:new Date().toISOString(),created:g.created||new Date().toISOString()};
    db.galleries=db.galleries||[];
    if(g.id)db.galleries=db.galleries.map(x=>x.id===g.id?o:x);else db.galleries.unshift(o);
    save();modal.close();render();toast('Galleria salvata');
  });
}
function galleriesDocHtml(){
  const col=(pdfCfg().colore)||'#8a6a1f';
  let out='<h1 style="margin:0 0 4px">Gallerie</h1><p style="color:#666;margin:0 0 18px">'+esc(db.settings.artist||'')+' &middot; '+new Date().toLocaleDateString('it-IT')+'</p>';
  (db.galleries||[]).forEach(g=>{
    out+='<div style="border-bottom:1px solid #e5e5e5;padding:12px 0"><strong style="font-size:1.05em">'+esc(g.name||'')+'</strong>'+(g.type?' <span style="color:'+col+'">&middot; '+esc(g.type)+'</span>':'')
      +((g.address||g.city)?'<br>'+esc([g.address,g.city].filter(Boolean).join(', ')):'')
      +(g.manager?'<br>Referente: '+esc(g.manager)+(g.managerRole?' ('+esc(g.managerRole)+')':''):'')
      +(g.phone?'<br>Tel: '+esc(g.phone):'')+(g.email?'<br>Email: '+esc(g.email):'')
      +(g.website?'<br>'+esc(g.website):'')+'</div>';
  });
  return out;
}
function galleriesPlain(){return 'GALLERIE\n\n'+(db.galleries||[]).map(g=>[g.name,g.city,g.manager,g.phone,g.email,g.website].filter(Boolean).join(' \u00b7 ')).join('\n');}

function timelineEventi(){
  const ev=[];
  const push=(data,tipo,tit,icona,rotta)=>{if(data)ev.push({data,tipo,tit,icona,rotta});};
  (db.artworks||[]).forEach(a=>push(a.created,'Opera','Opera: '+(a.title||'senza titolo'),'\ud83c\udfa8','artworks'));
  (db.sales||[]).forEach(x=>{const a=db.artworks.find(o=>o.id===x.artworkId);push(x.date||x.created,'Vendita','Vendita'+(a?': '+a.title:'')+(x.total?' \u2014 '+euro(x.total):''),'\ud83d\udcb6','sales');});
  (db.exhibitions||[]).forEach(x=>push(x.startDate||x.created,'Mostra','Mostra: '+(x.title||''),'\ud83c\udfdb\ufe0f','exhibitions'));
  (db.certificates||[]).forEach(x=>push(x.date||x.created,'Certificato','Certificato: '+(x.title||''),'\u2726','certificates'));
  (db.agenda||[]).forEach(x=>push(x.date,'Agenda',(x.title||'Impegno'),'\ud83d\udcc5','agenda'));
  (db.library||[]).forEach(x=>push(x.created,'Documento','Documento: '+(x.title||x.name||''),'\ud83d\udcda','library'));
  const soglia=db.settings.timelineFrom?new Date(db.settings.timelineFrom):null;
  let lista=ev.filter(e=>{const d=new Date(e.data);return !isNaN(d)&&(!soglia||d>=soglia);});
  lista.sort((a,b)=>new Date(b.data)-new Date(a.data));
  return lista;
}
function timelineView(){
  const ev=timelineEventi();
  const perMese={};
  ev.forEach(e=>{const d=new Date(e.data);const k=d.toLocaleDateString('it-IT',{year:'numeric',month:'long'});(perMese[k]=perMese[k]||[]).push(e);});
  const blocchi=Object.keys(perMese).map(mese=>'<div class="tl-mese"><h3>'+esc(mese)+'</h3>'
    +perMese[mese].map(e=>'<button class="tl-ev" data-go="'+e.rotta+'"><span class="tl-ico">'+e.icona+'</span><span class="tl-txt"><strong>'+esc(e.tit)+'</strong><small>'+new Date(e.data).toLocaleDateString('it-IT')+' \u00b7 '+esc(e.tipo)+'</small></span></button>').join('')
    +'</div>').join('');
  const soglia=db.settings.timelineFrom?('<p class="meta">Mostro gli eventi dal '+new Date(db.settings.timelineFrom).toLocaleDateString('it-IT')+' in poi.</p>'):'';
  return section('Timeline','<button class="btn" data-action="timelineAzzera">\ud83e\uddf9 Azzera da data</button>')
   +'<section class="hero"><h2>\ud83d\udd52 Timeline</h2><p>Cronologia automatica di opere, vendite, mostre, certificati, documenti e impegni.</p></section>'
   +soglia
   +(ev.length?'<div class="timeline">'+blocchi+'</div>':empty('\ud83d\udd52','Nessun evento da mostrare.'+(db.settings.timelineFrom?' Prova a rimuovere il filtro data.':'')));
}
function timelineAzzeraModal(){
  const oggi=new Date().toISOString().slice(0,10);
  openModal('Azzera timeline da una data','<div class="formgrid">'
    +'<p class="meta full">La timeline mostrer\u00e0 solo gli eventi <strong>a partire</strong> dalla data scelta. Gli eventi precedenti verranno nascosti dalla cronologia (i dati NON vengono cancellati).</p>'
    +field('Mostra eventi dal','timelineFrom',db.settings.timelineFrom||oggi,'date','full')
    +(db.settings.timelineFrom?'<label class="chkline"><input type="checkbox" name="rimuovi"> Rimuovi il filtro e mostra tutto</label>':'')
  +'</div>',fd=>{
    if(fd.get('rimuovi')){delete db.settings.timelineFrom;}
    else{const d=fd.get('timelineFrom');if(d)db.settings.timelineFrom=d;}
    save();modal.close();go('timeline');toast('Timeline aggiornata');
  });
}

function donaModal(){
  const paypal='mauro_maurizio@hotmail.it';
  const en=appLang()==='en';
  const p1=en
    ?'MAIR GO! is a <strong>free, ad-free project</strong>, created by an artist for artists. It does not collect personal data and has no source of income.'
    :'MAIR GO! &egrave; un progetto <strong>gratuito e senza pubblicit&agrave;</strong>, creato da un artista per gli artisti. Non raccoglie dati e non ha alcuna fonte di guadagno.';
  const p2=en
    ?'Maintaining and improving it &mdash; with new features, fixes and updates &mdash; requires time and dedication. If you find the app useful, even a small donation helps <strong>keep it alive, free and available to everyone</strong>.'
    :'Mantenerlo e migliorarlo &mdash; nuove funzioni, correzioni, aggiornamenti &mdash; richiede tempo e lavoro. Se l\u2019app ti &egrave; utile, una donazione anche piccola aiuta a <strong>tenerla viva, libera e gratuita per tutti</strong>.';
  openModal(T('\u2764\ufe0f Sostieni MAIR GO!'),'<div style="text-align:center;padding:6px">'
    +'<div style="font-size:2.6rem;margin-bottom:10px">\u2764\ufe0f</div>'
    +'<p style="line-height:1.6;text-align:left">'+p1+'</p>'
    +'<p style="line-height:1.6;text-align:left">'+p2+'</p>'
    +'<div style="background:color-mix(in srgb,#0070ba 12%,transparent);border-radius:12px;padding:16px;margin:16px 0">'
    +'<div style="font-size:.85rem;color:var(--muted)">'+T('Dona con PayPal a')+'</div>'
    +'<div style="font-weight:700;font-size:1.05rem;margin:4px 0;word-break:break-all">'+paypal+'</div>'
    +'</div>'
    +'<button class="btn primary" id="donaCopia" style="width:100%;padding:13px">\ud83d\udccb '+T('Copia indirizzo PayPal')+'</button>'
    +'<button class="btn" id="donaApri" style="width:100%;padding:13px;margin-top:8px">\ud83c\udf10 '+T('Apri PayPal')+'</button>'
    +'<p class="meta" style="margin-top:14px">'+T('Grazie di cuore per il sostegno.')+'</p>'
  +'</div>',()=>modal.close(),T('Chiudi'));
  setTimeout(()=>{
    const c=document.getElementById('donaCopia');
    if(c)c.onclick=async()=>{try{await navigator.clipboard.writeText(paypal);toast('Indirizzo PayPal copiato');}catch(e){toast(T('Copia manuale: ')+paypal);}};
    const a=document.getElementById('donaApri');
    if(a)a.onclick=()=>{try{window.open('https://www.paypal.com/','_blank');}catch(e){}};
  },100);
}

function guideViewIT(){return `${section('Guida offline')}
<section class="hero"><h2>&#128214; Come usare MAIR GO!</h2><p>Guida completa a tutte le funzioni. Consultabile senza connessione.</p></section>

<div class="guide-wrap">

<details class="guide-item" open><summary><strong>&#9888;&#65039; Backup: leggi prima di tutto il resto</strong></summary>
<p>MAIR GO! conserva i dati <strong>dentro il tuo dispositivo</strong>. Non c'&egrave; un server, non c'&egrave; un account: nessuno pu&ograve; leggere il tuo archivio, ma <strong>nessuno pu&ograve; nemmeno restituirtelo</strong> se lo perdi.</p>
<p><strong>Puoi perdere tutto se:</strong> disinstalli l'app, cancelli i dati dell'app dalle impostazioni di Android, il telefono si rompe o si perde, oppure cambi dispositivo.</p>
<p><strong>La soluzione:</strong> vai in <em>Impostazioni &rarr; Backup &rarr; Esporta ora</em>. L'app crea un file <strong>.mair</strong> che contiene <strong>tutto</strong>: opere con le immagini, documenti, certificati, cataloghi, clienti, vendite, agenda e impostazioni.</p>
<p>Quando premi Esporta si apre il pannello di condivisione di Android: da l&igrave; scegli dove mettere il file &mdash; Google Drive, email a te stesso, WhatsApp, oppure "Salva su file" per una cartella del telefono. <strong>Mandalo fuori dal dispositivo</strong>: un backup che resta solo nel telefono non ti salva se perdi il telefono.</p>
<p>Per ripristinare: <em>Impostazioni &rarr; Backup &rarr; Importa</em>, scegli il file .mair e tutto torna com'era, immagini comprese.</p>
<p>Nella schermata Backup un riquadro colorato ti avverte: <strong>verde</strong> se hai salvato di recente, <strong>giallo</strong> se sono passati 3 giorni o pi&ugrave;. Fai un backup ogni volta che aggiungi lavoro importante.</p>
</details>

<details class="guide-item"><summary><strong>&#128247; Immagini delle opere</strong></summary>
<p>Ogni immagine caricata pu&ograve; pesare al massimo <strong>5 MB</strong>: se &egrave; pi&ugrave; grande, l'app lo segnala e non la carica.</p>
<p>L'immagine viene conservata nella sua <strong>qualit&agrave; originale</strong>, senza compressioni che rovinano la resa. In pi&ugrave;, l'app genera automaticamente una <strong>miniatura</strong> leggera usata negli elenchi e nelle ricerche: cos&igrave; le liste scorrono veloci e l'app consuma meno memoria, mentre la foto piena resta disponibile quando serve.</p>
<p>Gli elenchi di opere si caricano <strong>a blocchi</strong>: vedi subito le prime opere e le altre compaiono scorrendo, o con il pulsante &laquo;Carica altre&raquo;. Utile quando l'archivio diventa grande.</p>
</details>

<details class="guide-item"><summary><strong>&#128190; Backup sicuro (verifica e ripristino)</strong></summary>
<p>Il backup salva <strong>tutte le sezioni</strong>: opere con immagini, documenti, certificati, cataloghi, clienti, vendite, mostre, gallerie, curatori, link, agenda e impostazioni.</p>
<p><strong>Verifica prima del salvataggio:</strong> quando crei un backup, l'app controlla che il file sia completo e rileggibile <em>prima</em> di proporti dove salvarlo. Se qualcosa non va, ti avvisa e non crea un file difettoso.</p>
<p><strong>Controllo di integrit&agrave;:</strong> ogni backup porta con s&eacute; un codice di controllo. Al ripristino l'app lo ricalcola: se il file si &egrave; danneggiato durante il salvataggio o il trasferimento, viene bloccato invece di caricare dati rovinati.</p>
<p><strong>Ripristino sicuro:</strong> prima di sostituire i dati attuali, l'app ne crea una <strong>copia di sicurezza</strong>. Dopo il ripristino ti chiede se vuoi tenere i dati caricati o <strong>tornare a quelli di prima</strong>: cos&igrave; un ripristino sbagliato non ti fa perdere nulla.</p>
<p><strong>Compatibilit&agrave;:</strong> vengono letti anche i vecchi backup nei formati <code>.mair</code> e <code>.json</code>.</p>
</details>

<details class="guide-item"><summary><strong>&#128190; Dove finiscono i file salvati</strong></summary>
<p>Tutto ci&ograve; che l'app salva &mdash; PDF, cataloghi, Excel, archivi ZIP, backup, agenda &mdash; viene messo in una cartella dedicata e <strong>visibile</strong> del telefono:</p>
<p style="text-align:center"><strong>Documenti &rarr; MAIR GO</strong></p>
<p>La trovi con l'app <em>File</em> (o <em>Files</em>) del telefono, nella sezione Documenti. I file restano l&igrave; anche se non fai altro.</p>
<p>Dopo il salvataggio l'app ti chiede se vuoi <strong>anche</strong> inviare o copiare il file altrove (Google Drive, email, WhatsApp\u2026). &Egrave; solo un extra: se rispondi no o chiudi, il file &egrave; comunque gi&agrave; salvato nella cartella MAIR GO.</p>
</details>

<details class="guide-item"><summary><strong>&#128241; Installazione dell'app</strong></summary>
<p>MAIR GO! si installa come <strong>app Android</strong> tramite un file <strong>APK</strong>, non passando dal Play Store.</p>
<p><strong>Come si installa:</strong></p>
<ol>
<li>Ricevi o scarica il file <code>app-debug.apk</code> sul telefono.</li>
<li>Aprilo dalla cartella Download o dalla notifica di download.</li>
<li>Android avvisa che l'app proviene da "fonti sconosciute": &egrave; normale per le app non distribuite dallo Store. Concedi il permesso, viene chiesto una volta sola.</li>
<li>Conferma l'installazione. L'icona compare nella schermata Home.</li>
</ol>
<p><strong>Perch&eacute; compare quell'avviso:</strong> Android mostra un messaggio di cautela per ogni app che non arriva dal Play Store. Non indica un problema dell'app: segnala solo che Google non l'ha verificata, perch&eacute; non &egrave; stata pubblicata sul suo negozio.</p>
<p><strong>Aggiornamenti:</strong> per installare una versione nuova basta aprire il nuovo APK. Se Android rifiuta l'aggiornamento, disinstalla la versione precedente e reinstalla &mdash; <strong>ma fai prima un backup</strong>, perch&eacute; disinstallando i dati vengono cancellati.</p>
<p><strong>iPhone:</strong> gli APK non sono installabili su iOS. &Egrave; una limitazione di Apple, non aggirabile.</p>
</details>

<details class="guide-item"><summary><strong>&#127912; Opere</strong></summary>
<p>L'archivio centrale. Per ogni opera puoi registrare titolo, codice, anno, tecnica, supporto, dimensioni, cornice, stato, prezzo, descrizione e immagine.</p>
<p><strong>Filtri avanzati:</strong> il pannello sotto la barra di ricerca &egrave; chiuso all'apertura; toccalo per espanderlo e filtrare per anno, tecnica, stato o prezzo.</p>
<p><strong>Preferiti:</strong> la stellina segna le opere che vuoi ritrovare in fretta.</p>
<p>Le liste di tecniche, supporti, dimensioni, cornici e stati sono personalizzabili in <em>Impostazioni &rarr; Liste</em>.</p>
</details>

<details class="guide-item"><summary><strong>&#128218; Biblioteca</strong></summary>
<p>Archivio documentale per PDF, DOCX, immagini, testi e appunti: cataloghi, schede tecniche, contratti, articoli, materiale di ispirazione.</p>
<p>Ogni voce ha una categoria (personalizzabile) e pu&ograve; essere aperta direttamente nell'app.</p>
</details>

<details class="guide-item"><summary><strong>&#128196; PDF Studio</strong></summary>
<p>Crea cataloghi e dossier partendo dalle opere in archivio. Scegli titolo, sottotitolo, introduzione, quali opere includere e quali dati mostrare per ciascuna.</p>
<p>Aprendo il progetto e toccando <strong>Apri documento</strong> vedi l'anteprima, poi:</p>
<ul>
<li><strong>Salva PDF</strong> &mdash; genera il file e apre il pannello per scegliere dove metterlo.</li>
<li><strong>Condividi PDF</strong> &mdash; genera e invia direttamente.</li>
<li><strong>Impagina</strong> &mdash; apre le opzioni di impaginazione.</li>
<li><strong>Testo</strong> &mdash; versione testuale modificabile e copiabile.</li>
</ul>
<p><strong>Come esce il catalogo:</strong> copertina, introduzione, indice delle opere, poi <strong>una opera per pagina</strong> con immagine grande e scheda dati, e pagina finale con biografia e contatti. I numeri di pagina sono in basso.</p>
</details>

<details class="guide-item"><summary><strong>&#9881;&#65039; Impaginazione PDF personalizzabile</strong></summary>
<p>Da <em>Impostazioni &rarr; Impaginazione PDF</em> (o dal pulsante Impagina) controlli:</p>
<ul>
<li><strong>Formato</strong>: A4, A5, Letter, A3, verticale o orizzontale.</li>
<li><strong>Margini</strong>: alto, basso, sinistro e destro in millimetri.</li>
<li><strong>Carattere</strong>: Times, Helvetica o Courier.</li>
<li><strong>Colore di titoli e dettagli grafici</strong>: definisce il colore di titoli, linee, intestazioni e decorazioni nei PDF; non cambia le immagini delle opere.</li>
<li><strong>Immagini</strong>: altezza massima in percentuale e posizione.</li>
<li><strong>Sezioni</strong>: copertina, introduzione, indice, pagina finale, numeri, intestazione opera, riempimento pagina.</li>
</ul>
<p>Le impostazioni valgono per tutti i documenti generati e restano salvate.</p>
</details>

<details class="guide-item"><summary><strong>&#10022; Certificati</strong></summary>
<p>Cinque modelli pronti e personalizzabili: <strong>Autenticit&agrave;</strong>, <strong>Vendita/Cessione</strong>, <strong>Provenienza</strong>, <strong>Attestato di Esposizione</strong>, <strong>Donazione</strong>.</p>
<p>Scegli il modello, colleghi l'opera dall'archivio (immagine e dati tecnici vengono importati da soli), decidi quali campi mostrare e modifichi liberamente il testo.</p>
<p>Cinque temi grafici disponibili: Classico oro, Museo, Nero galleria, Editoriale, Minimal. La firma pu&ograve; essere testuale o un'immagine caricata.</p>
</details>

<details class="guide-item"><summary><strong>&#128241; Zona Social</strong></summary>
<p>Trasforma le opere in materiale pronto per Instagram, Facebook e TikTok.</p>
<p><strong>Immagine singola:</strong> genera una card curata. Puoi scegliere titolo, testo/didascalia libera, testo in alto, se mostrare la cornice e la firma. Quattro formati (quadrato, 4:5, storia 9:16, orizzontale) e quattro stili grafici.</p>
<p><strong>Sequenza immagini:</strong> fino a 5 opere numerate, ideali per un carosello.</p>
<p><strong>Video:</strong> monta fino a 5 opere in un filmato con titolo iniziale, transizioni miste (dissolvenza, scorrimento, zoom lento), dati di ogni opera e chiusura con i tuoi contatti. Durata regolabile da 3 a 5 secondi per opera.</p>
<p>La creazione del video avviene in tempo reale: per 5 opere servono circa 25 secondi, durante i quali <strong>lo schermo deve restare acceso</strong> e non bisogna uscire dall'app.</p>
<p>Il pulsante <strong>Testo per il post</strong> prepara didascalia e hashtag gi&agrave; pronti da copiare.</p>
</details>

<details class="guide-item"><summary><strong>&#128279; Link utili</strong></summary>
<p>Raccolta personale di indirizzi web divisi per categoria: <strong>Arte, Riviste, Concorsi, Musei, Gallerie, Fiere, Materiali, Formazione</strong>.</p>
<p>Tocca un link per aprirlo direttamente nel browser. Ogni voce pu&ograve; avere un titolo, una nota e la categoria.</p>
<p><strong>Categorie:</strong> il pulsante <em>Categorie</em> permette di aggiungerne di nuove, rinominarle o eliminarle &mdash; una per riga. I link di una categoria eliminata non vanno persi: vengono spostati nella prima categoria.</p>
<p><strong>Stampa PDF</strong> genera un elenco ordinato per categoria, con titoli, note e indirizzi.</p>
</details>

<details class="guide-item"><summary><strong>&#128100; Curatori, gallerie e critici</strong></summary>
<p>Rubrica dei contatti professionali, distinta dai clienti. Ogni contatto pu&ograve; avere <strong>fotografia</strong>, nome, ruolo, galleria o istituzione, citt&agrave;, telefono, email, sito e profili social (Instagram, Facebook, LinkedIn e un campo libero).</p>
<p>I ruoli disponibili: Curatore, Gallerista, Critico d\u2019arte, Giornalista, Collezionista, Organizzatore, Fotografo, Altro. I contatti vengono raggruppati automaticamente per ruolo.</p>
<p>Telefono ed email sono cliccabili: toccandoli parte la chiamata o si apre la posta.</p>
<p><strong>Stampa PDF</strong> produce l\u2019elenco completo dei recapiti.</p>
</details>

<details class="guide-item"><summary><strong>&#127963;&#65039; Gallerie</strong></summary>
<p>Schedario degli spazi espositivi con <strong>immagine della galleria</strong>, nome, tipologia (galleria privata, spazio pubblico, museo, fondazione, associazione, fiera), indirizzo e citt&agrave;.</p>
<p>Per ogni galleria puoi registrare il <strong>nome del referente</strong> e il suo ruolo, oltre a telefono, email, sito web e Instagram.</p>
<p><strong>Stampa PDF</strong> genera l\u2019elenco con tutti i recapiti.</p>
</details>

<details class="guide-item"><summary><strong>&#9906; Cercare nelle sezioni</strong></summary>
<p>Opere, Biblioteca, Mostre, Clienti, Vendite, Agenda, Certificati, Curatori, Gallerie e Link hanno una <strong>barra di ricerca</strong> in cima.</p>
<p>La ricerca esamina <strong>tutti i campi</strong> della scheda: nome, cognome, titolo, citt&agrave;, telefono, email, data, note, prezzo, categoria e cos&igrave; via. Non serve sapere in quale campo si trova il dato.</p>
<p>Puoi scrivere <strong>pi&ugrave; parole</strong>: vengono mostrate solo le schede che le contengono tutte. Ad esempio "milano curatore" trova i curatori di Milano.</p>
<p>In Curatori c\u2019&egrave; anche un filtro per ruolo, in Opere e Biblioteca i filtri avanzati, in Agenda il filtro per tipo.</p>
</details>

<details class="guide-item"><summary><strong>&#128682; Uscire dall\u2019app</strong></summary>
<p>In alto a destra, accanto al pulsante del tema, c\u2019&egrave; l\u2019icona <strong>&#9211;</strong> per uscire dall\u2019app. Lo stesso comando &egrave; anche in <em>Impostazioni &rarr; Chiudi applicazione</em>. I dati restano salvati.</p>
<p>Il <strong>tasto Indietro</strong> del telefono chiude prima eventuali finestre aperte, poi riporta alla schermata principale, e infine propone di uscire.</p>
</details>

<details class="guide-item"><summary><strong>&#128197; Agenda e promemoria</strong></summary>
<p>Appuntamenti, mostre, consegne, scadenze e promemoria con data, ora e luogo.</p>
<p>Nella schermata principale il riquadro <strong>Da fare</strong> raccoglie automaticamente ci&ograve; che &egrave; <strong>in ritardo</strong>, <strong>oggi</strong>, <strong>domani</strong> e nei <strong>prossimi giorni</strong>. Diventa dorato quando ci sono impegni urgenti. Si pu&ograve; nascondere da Personalizza.</p>
<p><strong>Esporta agenda .ics</strong> crea un file importabile in Google Calendar, Apple Calendario o Outlook.</p>
</details>

<details class="guide-item"><summary><strong>&#127963;&#65039; Mostre</strong></summary>
<p>La sezione Mostre permette di registrare esposizioni personali, collettive, concorsi, esposizioni temporanee e altri eventi, con titolo, date, sede, citt&agrave;, stato, descrizione, note e locandina.</p>
<p><strong>Opere partecipanti:</strong> usa la barra di ricerca per trovare le opere per titolo, codice, anno, tecnica, supporto o dimensioni. Puoi selezionarle una alla volta, usare <strong>Seleziona visibili</strong> per scegliere tutte quelle mostrate dalla ricerca oppure <strong>Deseleziona</strong> per azzerare la scelta.</p>
<p><strong>Curatori e critici:</strong> i contatti gi&agrave; presenti nella relativa rubrica vengono caricati automaticamente. Puoi cercarli, selezionarne pi&ugrave; di uno oppure aggiungerne uno nuovo direttamente dalla mostra. Il nuovo contatto viene salvato anche nella sezione Curatori e critici.</p>
<p><strong>Catalogo PDF:</strong> dalla scheda della mostra puoi creare direttamente un catalogo contenente le opere selezionate.</p>
</details>

<details class="guide-item"><summary><strong>&#128101; Clienti, Vendite e Workspace</strong></summary>
<p><strong>Clienti:</strong> rubrica di collezionisti e galleristi, con recapiti, preferenze e storico delle vendite.</p>
<p><strong>Vendite:</strong> trattative, importi, pagamenti, consegne e generazione della ricevuta.</p>
<p><strong>Workspace:</strong> progetti che raccolgono insieme opere, documenti e contatti.</p>
</details>

<details class="guide-item"><summary><strong>&#128338; Timeline</strong></summary>
<p>Cronologia automatica di tutto: opere, vendite, mostre, certificati, documenti e impegni, ordinati per data e raggruppati per mese. Tocca un evento per andare alla sezione relativa.</p>
<p>Con <strong>Azzera da data</strong> scegli una data di partenza: la timeline mostrer&agrave; solo gli eventi da l&igrave; in avanti. &Egrave; solo un filtro di visualizzazione &mdash; <strong>i dati non vengono cancellati</strong> &mdash; e si pu&ograve; rimuovere quando vuoi.</p>
</details>

<details class="guide-item"><summary><strong>&#127968; Personalizzare la schermata principale</strong></summary>
<p>Il pulsante <strong>Personalizza</strong> nella Home permette di scegliere:</p>
<ul>
<li>Titolo e frase di benvenuto personali.</li>
<li>Immagine di sfondo per l'intestazione.</li>
<li>Pulsante rapido principale.</li>
<li>Quali statistiche mostrare (dieci disponibili, incluso l'incassato totale).</li>
<li>Quali sezioni mostrare e in che ordine: la prima diventa il riquadro grande.</li>
<li>Se mostrare il riquadro "Da fare".</li>
</ul>
</details>

<details class="guide-item"><summary><strong>&#128202; Esportazione dati/Excel</strong></summary>
<p>Dalla sezione <strong>Esportazione dati/Excel</strong> puoi esportare tutto l'archivio in formati standard:</p>
<p><strong>Excel</strong>: sette fogli (opere, clienti, mostre, curatori, gallerie, vendite, certificati). Nel foglio Opere sono incorporate le miniature.</p>
<p><strong>Archivio completo (ZIP)</strong>: un unico file compresso con l'Excel, le immagini originali in una cartella, il catalogo HTML e le istruzioni.</p>
<p><strong>Catalogo HTML</strong>: una pagina web autonoma, consultabile offline con qualsiasi browser.</p>
<p><strong>Importazione Excel</strong>: reimporta i fogli esportati da MAIR GO!, con anteprima prima di confermare. I record con lo stesso codice vengono aggiornati, gli altri aggiunti.</p>
<p>Tutti i file finiscono nella cartella <strong>Documenti &rarr; MAIR GO</strong> del telefono.</p>
</details>

<details class="guide-item"><summary><strong>&#127760; Lingua / Language</strong></summary>
<p>In <em>Impostazioni &rarr; Aspetto</em> puoi scegliere la lingua dell'app tra <strong>Italiano</strong> e <strong>English</strong>.</p>
<p>La traduzione dell'interfaccia (menu, sezioni, pulsanti) viene applicata dopo aver premuto <strong>Salva aspetto</strong>. I tuoi dati (titoli delle opere, note, testi che hai scritto) restano ovviamente come li hai inseriti.</p>
</details>

<details class="guide-item"><summary><strong>&#128274; Sicurezza e aspetto</strong></summary>
<p><strong>PIN:</strong> da 4 a 6 cifre, richiesto all'avvio. Protegge l'accesso all'app, ma non cifra i file: per dati delicati usa anche il blocco schermo del telefono.</p>
<p><strong>Aspetto:</strong> tema, dimensione dei caratteri, animazioni e schermata iniziale sono regolabili in Impostazioni.</p>
</details>

<details class="guide-item"><summary><strong>&#128736; Se qualcosa non funziona</strong></summary>
<p>In <em>Impostazioni &rarr; Diagnostica</em> trovi il registro degli errori dell'app.</p>
<p>Aprilo, tocca <strong>Copia tutto</strong> e invia il testo tramite la sezione Contatti: contiene le informazioni tecniche utili a individuare il problema.</p>
</details>

</div>`}

function guideViewEN(){return `${section('Offline guide')}
<section class="hero"><h2>&#128214; How to use MAIR GO!</h2><p>Complete guide to every feature. Available without a connection.</p></section>

<div class="guide-wrap">

<details class="guide-item" open><summary><strong>&#9888;&#65039; Backup: read this before anything else</strong></summary>
<p>MAIR GO! keeps your data <strong>on your device</strong>. There is no server, no account: no one can read your archive, but <strong>no one can give it back to you</strong> if you lose it.</p>
<p><strong>You can lose everything if:</strong> you uninstall the app, clear the app data in Android settings, the phone breaks or is lost, or you change device.</p>
<p><strong>The solution:</strong> go to <em>Settings &rarr; Backup &rarr; Export now</em>. The app creates a <strong>.mair</strong> file containing <strong>everything</strong>: artworks with images, documents, certificates, catalogs, clients, sales, agenda and settings.</p>
<p>When you tap Export, the Android share panel opens: from there choose where to put the file &mdash; Google Drive, email to yourself, WhatsApp, or "Save to files" for a phone folder. <strong>Send it off the device</strong>: a backup that stays only on the phone won't help if you lose the phone.</p>
<p>To restore: <em>Settings &rarr; Backup &rarr; Import</em>, choose the .mair file and everything comes back as it was, images included.</p>
<p>On the Backup screen a colored box warns you: <strong>green</strong> if you saved recently, <strong>yellow</strong> if 3 or more days have passed. Make a backup whenever you add important work.</p>
</details>

<details class="guide-item"><summary><strong>&#128247; Artwork images</strong></summary>
<p>Each uploaded image can weigh at most <strong>5 MB</strong>: if larger, the app warns you and won't load it.</p>
<p>The image is kept at its <strong>original quality</strong>, without compression that ruins the result. In addition, the app automatically creates a lightweight <strong>thumbnail</strong> used in lists and searches: this way lists scroll fast and the app uses less memory, while the full photo stays available when needed.</p>
<p>Artwork lists load <strong>in blocks</strong>: you immediately see the first artworks and the others appear as you scroll, or with the &laquo;Load more&raquo; button. Useful when the archive gets large.</p>
</details>

<details class="guide-item"><summary><strong>&#128190; Safe backup (verification and restore)</strong></summary>
<p>The backup saves <strong>all sections</strong>: artworks with images, documents, certificates, catalogs, clients, sales, exhibitions, galleries, curators, links, agenda and settings.</p>
<p><strong>Verification before saving:</strong> when you create a backup, the app checks that the file is complete and readable <em>before</em> offering where to save it. If something is wrong, it warns you and does not create a faulty file.</p>
<p><strong>Integrity check:</strong> each backup carries a control code. On restore the app recalculates it: if the file was damaged during saving or transfer, it is blocked instead of loading corrupted data.</p>
<p><strong>Safe restore:</strong> before replacing your current data, the app makes a <strong>safety copy</strong>. After the restore it asks whether to keep the loaded data or <strong>go back to the previous one</strong>: this way a wrong restore won't make you lose anything.</p>
<p><strong>Compatibility:</strong> old backups in <code>.mair</code> and <code>.json</code> formats are also read.</p>
</details>

<details class="guide-item"><summary><strong>&#128190; Where saved files go</strong></summary>
<p>Everything the app saves &mdash; PDFs, catalogs, Excel, ZIP archives, backups, agenda &mdash; is placed in a dedicated and <strong>visible</strong> phone folder:</p>
<p style="text-align:center"><strong>Documents &rarr; MAIR GO</strong></p>
<p>You find it with the phone's <em>Files</em> app, in the Documents section. Files stay there even if you do nothing else.</p>
<p>After saving, the app asks whether you <strong>also</strong> want to send or copy the file elsewhere (Google Drive, email, WhatsApp&hellip;). It's only an extra: if you answer no or close, the file is already saved in the MAIR GO folder.</p>
</details>

<details class="guide-item"><summary><strong>&#128241; Installing the app</strong></summary>
<p>MAIR GO! installs as an <strong>Android app</strong> via an <strong>APK</strong> file, not through the Play Store.</p>
<p><strong>How to install:</strong></p>
<ol>
<li>Receive or download the <code>app-debug.apk</code> file on the phone.</li>
<li>Open it from the Download folder or the download notification.</li>
<li>Android warns that the app comes from "unknown sources": this is normal for apps not distributed through the Store. Grant permission, asked only once.</li>
<li>Confirm the installation. The icon appears on the Home screen.</li>
</ol>
<p><strong>Why that warning appears:</strong> Android shows a caution message for every app that doesn't come from the Play Store. It does not indicate an app problem: it only signals that Google hasn't verified it, because it wasn't published on its store.</p>
<p><strong>Updates:</strong> to install a new version just open the new APK. If Android refuses the update, uninstall the previous version and reinstall &mdash; <strong>but make a backup first</strong>, because uninstalling deletes the data.</p>
<p><strong>iPhone:</strong> APKs cannot be installed on iOS. It's an Apple limitation, not bypassable.</p>
</details>

<details class="guide-item"><summary><strong>&#127912; Artworks</strong></summary>
<p>The central archive. For each artwork you can record title, code, year, technique, support, dimensions, frame, status, price, description and image.</p>
<p><strong>Advanced filters:</strong> the panel under the search bar is closed at start; tap it to expand and filter by year, technique, status or price.</p>
<p><strong>Favorites:</strong> the star marks artworks you want to find quickly.</p>
<p>Lists of techniques, supports, dimensions, frames and statuses are customizable in <em>Settings &rarr; Lists</em>.</p>
</details>

<details class="guide-item"><summary><strong>&#128218; Library</strong></summary>
<p>Document archive for PDFs, DOCX, images, texts and notes: catalogs, technical sheets, contracts, articles, inspiration material.</p>
<p>Each entry has a (customizable) category and can be opened directly in the app.</p>
</details>

<details class="guide-item"><summary><strong>&#128196; PDF Studio</strong></summary>
<p>Create catalogs and dossiers from the artworks in the archive. Choose title, subtitle, introduction, which artworks to include and which data to show for each.</p>
<p>Opening the project and tapping <strong>Open document</strong> shows the preview, then:</p>
<ul>
<li><strong>Save PDF</strong> &mdash; generates the file and opens the panel to choose where to put it.</li>
<li><strong>Share PDF</strong> &mdash; generates and sends directly.</li>
<li><strong>Layout</strong> &mdash; opens the layout options.</li>
<li><strong>Text</strong> &mdash; editable and copyable text version.</li>
</ul>
<p><strong>How the catalog comes out:</strong> cover, introduction, index of artworks, then <strong>one artwork per page</strong> with a large image and a data sheet, and a final page with biography and contacts. Page numbers are at the bottom.</p>
</details>

<details class="guide-item"><summary><strong>&#9881;&#65039; Customizable PDF layout</strong></summary>
<p>From <em>Settings &rarr; PDF layout</em> (or the Layout button) you control:</p>
<ul>
<li><strong>Format</strong>: A4, A5, Letter, A3, portrait or landscape.</li>
<li><strong>Margins</strong>: top, bottom, left and right in millimeters.</li>
<li><strong>Font</strong>: Times, Helvetica or Courier.</li>
<li><strong>Accent color</strong>, body text and title size.</li>
<li><strong>Images</strong>: maximum height in percent and position.</li>
<li><strong>Sections</strong>: cover, introduction, index, final page, numbers, artwork header, page fill.</li>
</ul>
<p>The settings apply to all generated documents and stay saved.</p>
</details>

<details class="guide-item"><summary><strong>&#10022; Certificates</strong></summary>
<p>Five ready and customizable templates: <strong>Authenticity</strong>, <strong>Sale/Transfer</strong>, <strong>Provenance</strong>, <strong>Exhibition Certificate</strong>, <strong>Donation</strong>.</p>
<p>Choose the template, link the artwork from the archive (image and technical data are imported automatically), decide which fields to show and edit the text freely.</p>
<p>Five graphic themes available: Classic gold, Museum, Gallery black, Editorial, Minimal. The signature can be text or an uploaded image.</p>
</details>

<details class="guide-item"><summary><strong>&#128241; Social</strong></summary>
<p>Turn artworks into ready material for Instagram, Facebook and TikTok.</p>
<p><strong>Single image:</strong> generates a curated card with a gold frame, title, technical data and your signature. Four formats (square, vertical 4:5, story 9:16, horizontal) and four graphic styles.</p>
<p><strong>Image sequence:</strong> up to 5 numbered artworks, ideal for a carousel.</p>
<p><strong>Video:</strong> assembles up to 5 artworks into a clip with an opening title, mixed transitions (fade, slide, slow zoom), each artwork's data and a closing with your contacts. Duration adjustable from 3 to 5 seconds per artwork.</p>
<p>Video creation happens in real time: for 5 artworks it takes about 25 seconds, during which <strong>the screen must stay on</strong> and you must not leave the app.</p>
<p>The <strong>Post text</strong> button prepares a caption and hashtags ready to copy.</p>
</details>

<details class="guide-item"><summary><strong>&#128279; Useful links</strong></summary>
<p>Personal collection of web addresses divided by category: <strong>Art, Magazines, Competitions, Museums, Galleries, Fairs, Materials, Training</strong>.</p>
<p>Tap a link to open it directly in the browser. Each entry can have a title, a note and the category.</p>
<p><strong>Categories:</strong> the <em>Categories</em> button lets you add new ones, rename or delete them &mdash; one per line. Links in a deleted category are not lost: they move to the first category.</p>
<p><strong>PDF print</strong> generates an ordered list by category, with titles, notes and addresses.</p>
</details>

<details class="guide-item"><summary><strong>&#128100; Curators, galleries and critics</strong></summary>
<p>Directory of professional contacts, separate from clients. Each contact can have a <strong>photo</strong>, name, role, gallery or institution, city, phone, email, website and social profiles (Instagram, Facebook, LinkedIn and a free field).</p>
<p>Available roles: Curator, Gallerist, Art critic, Journalist, Collector, Organizer, Photographer, Other. Contacts are automatically grouped by role.</p>
<p>Phone and email are clickable: tapping them starts the call or opens the mail.</p>
<p><strong>PDF print</strong> produces the complete list of contacts.</p>
</details>

<details class="guide-item"><summary><strong>&#127963;&#65039; Galleries</strong></summary>
<p>File of exhibition spaces with a <strong>gallery image</strong>, name, type (private gallery, public space, museum, foundation, association, fair), address and city.</p>
<p>For each gallery you can record the <strong>contact person's name</strong> and role, plus phone, email, website and Instagram.</p>
<p><strong>PDF print</strong> generates the list with all contacts.</p>
</details>

<details class="guide-item"><summary><strong>&#9906; Searching in sections</strong></summary>
<p>Artworks, Library, Exhibitions, Clients, Sales, Agenda, Certificates, Curators, Galleries and Links have a <strong>search bar</strong> at the top.</p>
<p>The search examines <strong>all fields</strong> of the record: name, surname, title, city, phone, email, date, notes, price, category and so on. You don't need to know which field the data is in.</p>
<p>You can type <strong>several words</strong>: only records containing all of them are shown. For example "milan curator" finds curators in Milan.</p>
<p>Curators also have a role filter, Artworks and Library have advanced filters, Agenda has a type filter.</p>
</details>

<details class="guide-item"><summary><strong>&#128682; Exiting the app</strong></summary>
<p>Top right, next to the theme button, there's the <strong>&#9211;</strong> icon to exit the app. The same command is also in <em>Settings &rarr; Close application</em>. Data stays saved.</p>
<p>The phone's <strong>Back button</strong> first closes any open windows, then returns to the main screen, and finally offers to exit.</p>
</details>

<details class="guide-item"><summary><strong>&#128197; Agenda and reminders</strong></summary>
<p>Appointments, exhibitions, deliveries, deadlines and reminders with date, time and place.</p>
<p>On the main screen the <strong>To do</strong> box automatically gathers what is <strong>overdue</strong>, <strong>today</strong>, <strong>tomorrow</strong> and in the <strong>coming days</strong>. It turns gold when there are urgent commitments. It can be hidden from Customize.</p>
<p><strong>Export agenda .ics</strong> creates a file importable into Google Calendar, Apple Calendar or Outlook.</p>
</details>

<details class="guide-item"><summary><strong>&#127963;&#65039; Exhibitions</strong></summary>
<p><strong>Exhibitions:</strong> shows with venue, dates, curator and linked artworks. You can upload the <strong>poster</strong>, which appears at the top of the record. From an exhibition you can generate a catalog directly.</p>
</details>

<details class="guide-item"><summary><strong>&#128101; Clients, Sales and Workspace</strong></summary>
<p><strong>Clients:</strong> directory of collectors and gallerists, with sales history.</p>
<p><strong>Sales:</strong> deals and payments, with receipt generation.</p>
<p><strong>Workspace:</strong> projects gathering artworks, documents and contacts together.</p>
</details>

<details class="guide-item"><summary><strong>&#128338; Timeline</strong></summary>
<p>Automatic history of everything: artworks, sales, exhibitions, certificates, documents and tasks, sorted by date and grouped by month. Tap an event to go to its section.</p>
<p>With <strong>Reset from date</strong> you choose a starting date: the timeline shows only events from there on. It's just a display filter &mdash; <strong>data is not deleted</strong> &mdash; and can be removed anytime.</p>
</details>

<details class="guide-item"><summary><strong>&#127968; Customizing the main screen</strong></summary>
<p>The <strong>Customize</strong> button on the Home lets you choose:</p>
<ul>
<li>Personal title and welcome phrase.</li>
<li>Background image for the header.</li>
<li>Main quick button.</li>
<li>Which statistics to show (ten available, including total revenue).</li>
<li>Which sections to show and in what order: the first becomes the large box.</li>
<li>Whether to show the "To do" box.</li>
</ul>
</details>

<details class="guide-item"><summary><strong>&#128202; Data/Excel export</strong></summary>
<p>From the <strong>Data/Excel export</strong> section you can export the whole archive in standard formats:</p>
<p><strong>Excel</strong>: seven sheets (artworks, clients, exhibitions, curators, galleries, sales, certificates). Thumbnails are embedded in the Artworks sheet.</p>
<p><strong>Full archive (ZIP)</strong>: a single compressed file with the Excel, the original images in a folder, the HTML catalog and the instructions.</p>
<p><strong>HTML catalog</strong>: a standalone web page, viewable offline with any browser.</p>
<p><strong>Excel import</strong>: re-imports the sheets exported from MAIR GO!, with a preview before confirming. Records with the same code are updated, the others added.</p>
<p>All files end up in the <strong>Documents &rarr; MAIR GO</strong> folder on the phone.</p>
</details>

<details class="guide-item"><summary><strong>&#127760; Language / Lingua</strong></summary>
<p>In <em>Settings &rarr; Appearance</em> you can choose the app language between <strong>Italiano</strong> and <strong>English</strong>.</p>
<p>The interface translation (menu, sections, buttons) is applied after tapping <strong>Save appearance</strong>. Your data (artwork titles, notes, texts you wrote) obviously stays as you entered it.</p>
</details>

<details class="guide-item"><summary><strong>&#128274; Security and appearance</strong></summary>
<p><strong>PIN:</strong> 4 to 6 digits, required at startup. It protects access to the app, but does not encrypt the files: for sensitive data also use the phone's screen lock.</p>
<p><strong>Appearance:</strong> theme, font size, animations and startup screen are adjustable in Settings.</p>
</details>

<details class="guide-item"><summary><strong>&#128736; If something doesn't work</strong></summary>
<p>In <em>Settings &rarr; Diagnostics</em> you find the app's error log.</p>
<p>Open it, tap <strong>Copy all</strong> and send the text via the Contact section: it contains the technical information useful to identify the problem.</p>
</details>

</div>`}

function guideView(){return appLang()==='en'?guideViewEN():guideViewIT();}

function infoViewEN(){return `${section('About')}<section class="legal-card"><div class="about-logo">M</div><h2>MAIR GO!</h2>
<p class="lead"><strong>Art Management System created by the international artist Maurizio D'Andrea.</strong></p>
<p><span class="badge">Version 1.0</span></p>
<p>Free application to manage artworks, documents, catalogs, certificates, exhibitions, galleries, curators and critics, useful links, clients, sales and agenda. Distributed without guaranteed support service.</p>

<h3>&#128274; Your privacy, concretely</h3>
<p><strong>Your data never leaves your device.</strong> There is no server receiving it, no cloud storing it, no central archive. Everything you write and upload stays physically on the phone or computer you are using.</p>
<p>This means that <strong>no one can read your archive</strong>: neither the app's author, nor third parties, nor advertising companies. Not because of a promise not to look, but because <strong>technically there is no place to look</strong>.</p>

<h3>&#9881;&#65039; How it really works</h3>
<p>The app saves data in two stores internal to the device:</p>
<ul>
<li><strong>Main archive</strong>: contains artworks, images, documents, certificates, clients and sales. It also handles heavy files like artwork photos.</li>
<li><strong>Service copy</strong>: a second smaller store, used as a reserve when the data is limited.</li>
</ul>
<p>Saving is automatic: it happens at every change and also when you close the app or send it to the background.</p>

<h3>&#128241; What the app does NOT do</h3>
<ul>
<li>Does not require registration or create accounts.</li>
<li>Does not ask for email, password or phone number to work.</li>
<li>Does not show ads and does not profile the user.</li>
<li>Does not access on its own your contacts, calls, SMS, microphone, camera or GPS location.</li>
<li>Does not send usage statistics or automatic reports.</li>
</ul>
<p>Access to files and images happens <strong>only</strong> when you select them. Sharing, sending emails and opening sites start solely from an explicit command of yours.</p>

<h3>&#127760; When something leaves the device</h3>
<p>It happens only at your request, and always with a touch of yours: when you save a PDF, export a backup, generate an image or a video for social media, or use the share button. At that moment it is the phone's system that handles the file, and you choose where to send it.</p>

<h3>&#128273; The PIN</h3>
<p>The PIN prevents opening the app for anyone who picks up your device. It is an <strong>access protection, not encryption</strong>: it does not make the underlying files unreadable. For very sensitive data, combine it with the phone's screen lock.</p>

<h3>&#9888;&#65039; The other side of the coin</h3>
<p>The fact that the data is only yours has a price: <strong>if the device is lost, breaks or is wiped, there is no one to recover it from</strong>. There is no "password recovery", because there is no account. That's why the backup is not optional: it is the only safety net. You find the full explanation in the Guide.</p>

<h3>&#9878;&#65039; Responsibility</h3>
<p>Use is under the user's full responsibility. The author does not guarantee service continuity, compatibility with every device or data recovery, and is not liable for losses or damages arising from use of the app, within the limits allowed by applicable law.</p>

<h3>&#9993;&#65039; Contacts</h3>
<p><a href="mailto:dandreart.info@gmail.com">dandreart.info@gmail.com</a><br><a href="https://www.dandreart.info" target="_blank" rel="noopener">www.dandreart.info</a></p>
<p class="meta">MAIR GO! 7.5 &middot; Free software &middot; Data on device &middot; No account &middot; No ads</p></section>`}

function infoView(){return appLang()==='en'?infoViewEN():infoViewIT();}

function contactView(){return `${section('Contatti e segnalazioni')}
<section class="hero"><h2>&#9993;&#65039; Scrivi all'autore</h2><p>Segnalazioni, malfunzionamenti, suggerimenti o richieste.</p></section>
<div class="formgrid">
${field('Il tuo nome','contactName','','text','full')}
${field('La tua email','contactEmail','','email','full')}
<div class="field full"><label>Categoria</label><select id="contactCategory">
<option>Malfunzionamento</option><option>Suggerimento</option><option>Domanda sull'uso</option><option>Collaborazione</option><option>Altro</option>
</select></div>
${field('Oggetto','contactSubject','','text','full')}
${area('Messaggio','contactMessage','')}
<div class="row full"><button class="btn primary" data-action="prepareEmail">&#9993;&#65039; Prepara email</button><button class="btn" data-action="copyContactEmail">Copia indirizzo</button></div>
<p class="meta full">Il pulsante apre la tua app di posta con il messaggio gi&agrave; compilato. Per i malfunzionamenti, allega il testo copiato dalla Diagnostica.</p>
</div>`}

function infoViewIT(){return `${section('Informazioni')}<section class="legal-card"><div class="about-logo">M</div><h2>MAIR GO!</h2>
<p class="lead"><strong>Art Management System creato dall'artista internazionale Maurizio D'Andrea.</strong></p>
<p><span class="badge">Versione 1.0</span></p>
<p>Applicazione gratuita per gestire opere, documenti, cataloghi, certificati, mostre, gallerie, curatori e critici, link utili, clienti, vendite e agenda. Distribuita senza servizio di assistenza garantito.</p>

<h3>&#128274; La tua privacy, in concreto</h3>
<p><strong>I tuoi dati non escono dal tuo dispositivo.</strong> Non c'&egrave; un server che li riceve, non c'&egrave; un cloud che li conserva, non esiste un archivio centrale. Tutto quello che scrivi e carichi resta fisicamente nel telefono o nel computer che stai usando.</p>
<p>Questo significa che <strong>nessuno pu&ograve; leggere il tuo archivio</strong>: n&eacute; l'autore dell'app, n&eacute; terze parti, n&eacute; societ&agrave; pubblicitarie. Non perch&eacute; ci sia una promessa di non guardare, ma perch&eacute; <strong>tecnicamente non esiste il luogo dove guardare</strong>.</p>

<h3>&#9881;&#65039; Come funziona davvero</h3>
<p>L'app salva i dati in due depositi interni al dispositivo:</p>
<ul>
<li><strong>Archivio principale</strong>: contiene opere, immagini, documenti, certificati, clienti e vendite. Regge anche file pesanti come le foto delle opere.</li>
<li><strong>Copia di servizio</strong>: un secondo deposito pi&ugrave; piccolo, usato come riserva quando i dati sono contenuti.</li>
</ul>
<p>Il salvataggio &egrave; automatico: avviene a ogni modifica e anche quando chiudi l'app o la mandi in secondo piano.</p>

<h3>&#128241; Cosa l'app NON fa</h3>
<ul>
<li>Non richiede registrazione n&eacute; crea account.</li>
<li>Non chiede email, password o numero di telefono per funzionare.</li>
<li>Non mostra pubblicit&agrave; e non profila l'utente.</li>
<li>Non accede da sola a rubrica, chiamate, SMS, microfono, fotocamera, posizione GPS.</li>
<li>Non invia statistiche d'uso n&eacute; segnalazioni automatiche.</li>
</ul>
<p>L'accesso a file e immagini avviene <strong>soltanto</strong> quando sei tu a selezionarli. Condivisioni, invio di email e apertura di siti partono unicamente da un tuo comando esplicito.</p>

<h3>&#127760; Quando qualcosa esce dal dispositivo</h3>
<p>Succede solo su tua richiesta, e sempre con un tocco tuo: quando salvi un PDF, esporti un backup, generi un'immagine o un video per i social, o usi il pulsante di condivisione. In quel momento &egrave; il sistema del telefono a gestire il file, e sei tu a scegliere dove mandarlo.</p>

<h3>&#128273; Il PIN</h3>
<p>Il PIN impedisce di aprire l'app a chi prende in mano il tuo dispositivo. &Egrave; una <strong>protezione di accesso, non una cifratura</strong>: non rende illeggibili i file sottostanti. Per dati molto sensibili, affiancalo al blocco schermo del telefono.</p>

<h3>&#9888;&#65039; Il rovescio della medaglia</h3>
<p>Il fatto che i dati siano solo tuoi ha un prezzo: <strong>se il dispositivo si perde, si rompe o viene ripulito, non esiste nessuno da cui recuperarli</strong>. Non c'&egrave; un "recupero password", perch&eacute; non c'&egrave; un account. Per questo il backup non &egrave; un optional: &egrave; l'unica rete di sicurezza. Trovi la spiegazione completa nella Guida.</p>

<h3>&#9878;&#65039; Responsabilit&agrave;</h3>
<p>L'utilizzo avviene sotto la piena responsabilit&agrave; dell'utente. L'autore non garantisce continuit&agrave; del servizio, compatibilit&agrave; con ogni dispositivo o recupero dei dati, e non risponde di perdite o danni derivanti dall'uso dell'app, nei limiti consentiti dalla legge applicabile.</p>

<h3>&#9993;&#65039; Contatti</h3>
<p><a href="mailto:dandreart.info@gmail.com">dandreart.info@gmail.com</a><br><a href="https://www.dandreart.info" target="_blank" rel="noopener">www.dandreart.info</a></p>
<p class="meta">MAIR GO! 7.5 &middot; Software gratuito &middot; Dati sul dispositivo &middot; Nessun account &middot; Nessuna pubblicit&agrave;</p></section>`}

function settingsView(){const L=db.settings.lists;return `${section('Impostazioni')}<div class="settings-tabs"><a href="#appearance">${T('Aspetto')}</a><a href="#security">${T('Sicurezza')}</a><a href="#profile">${T('Profilo')}</a><a href="#lists">${T('Liste')}</a><a href="#backup">${T('Backup')}</a></div><div class="formgrid"><div class="card" id="appearance"><div class="cardbody"><h3>${T('🎨 Aspetto')}</h3><div class="field"><label>${T('Tema dell\u2019app')}</label><select id="themeSetting">${themeOptions.map(([v,l])=>`<option value="${v}" ${db.settings.theme===v?'selected':''}>${l}</option>`).join('')}</select></div><div class="field"><label>${T('Dimensione caratteri')}</label><select id="fontSetting"><option value="small" ${db.settings.fontSize==='small'?'selected':''}>${T('Piccola')}</option><option value="medium" ${db.settings.fontSize==='medium'?'selected':''}>${T('Media')}</option><option value="large" ${db.settings.fontSize==='large'?'selected':''}>${T('Grande')}</option></select></div><div class="field"><label>Lingua / Language</label><select id="langSetting"><option value="it" ${(db.settings.lang||'it')==='it'?'selected':''}>Italiano</option><option value="en" ${db.settings.lang==='en'?'selected':''}>English</option></select></div><label class="switchrow"><input id="animationsSetting" type="checkbox" ${db.settings.animations!==false?'checked':''}> ${T('Animazioni')}</label><label class="switchrow"><input id="splashSetting" type="checkbox" ${db.settings.splash!==false?'checked':''}> ${T('Mostra splash all\u2019avvio')}</label><button class="btn primary" data-action="saveAppearance">${T('Salva aspetto')}</button></div></div><div class="card" id="security"><div class="cardbody"><h3>${T('🔒 Sicurezza')}</h3><label class="switchrow"><input id="pinEnabled" type="checkbox" ${db.settings.pinEnabled?'checked':''}> ${T('Richiedi PIN all\u2019avvio')}</label><div class="field"><label>${T('Nuovo PIN (4\u20136 cifre)')}</label><input id="newPin" type="password" inputmode="numeric" maxlength="6" placeholder="Lascia vuoto per non cambiarlo"></div><div class="field"><label>${T('Conferma PIN')}</label><input id="confirmPin" type="password" inputmode="numeric" maxlength="6"></div><button class="btn primary" data-action="savePin">${T('Salva sicurezza')}</button><p class="meta">${T('Il PIN è una protezione locale di accesso, non una cifratura dei file.')}</p></div></div><div class="card" id="profile"><div class="cardbody"><h3>${T('👤 Profilo artista')}</h3>${field('Nome artista / atelier','artist',db.settings.artist)}${area('Biografia','bio',db.settings.bio,'')}${field('Email','email',db.settings.email,'email')}${field('Telefono','phone',db.settings.phone)}<button class="btn primary" data-action="saveProfile">${T('Salva profilo')}</button></div></div><div class="card"><div class="cardbody"><h3>${T('📄 Impaginazione PDF')}</h3><p class="meta">${T('Formato, margini, caratteri, colori, immagini e sezioni dei documenti generati.')}</p><button class="btn" data-action="pdfSettings">${T('Configura impaginazione')}</button></div></div><div class="card"><div class="cardbody"><h3>${T('❤️ Sostieni il progetto')}</h3><p class="meta">${T('MAIR GO! è gratuita e senza pubblicità. Una donazione aiuta a mantenerla e migliorarla.')}</p><button class="btn primary" data-action="dona">${T('❤️ Dona con PayPal')}</button></div></div><div class="card"><div class="cardbody"><h3>${T('🚪 Chiudi applicazione')}</h3><p class="meta">${T('Chiude completamente MAIR GO!. I dati restano salvati.')}</p><button class="btn danger" data-action="esciApp">${T('Esci dall\u2019app')}</button></div></div><div class="card"><div class="cardbody"><h3>${T('🛠 Diagnostica')}</h3><p class="meta">${T('Se qualcosa non funziona, apri il registro errori e invia il testo allo sviluppatore.')}</p><button class="btn" data-action="openDiag">${T('Apri diagnostica')}</button></div></div><div class="card"><div class="cardbody"><h3>${T('Prova e tutorial')}</h3><p class="meta">${haDatiEsempio()?T('L\u2019app contiene dati d\u2019esempio (opere, curatore, cliente, vendita, mostra). Quando vuoi puoi rimuoverli: le tue voci reali restano intatte.'):T('Puoi caricare alcuni dati d\u2019esempio per esplorare l\u2019app, e rimuoverli in qualsiasi momento.')}</p><div class="row">${haDatiEsempio()?`<button class="btn danger" data-action="rimuoviEsempio">${T('Rimuovi dati d\u2019esempio')}</button>`:`<button class="btn primary" data-action="caricaEsempio">${T('Carica dati d\u2019esempio')}</button>`}<button class="btn" data-action="rivediTour">${T('Rivedi il tour')}</button></div></div></div><div class="card" id="backup"><div class="cardbody"><h3>${T('💾 Backup')}</h3>${backupBanner()}<p>${T('Il file .backup contiene tutto l’archivio MAIR GO!: opere e immagini, documenti, certificati, cataloghi, clienti, vendite, agenda e impostazioni.').replace('.backup','<strong>.backup</strong>')}</p><p>${T('Premi Crea Backup e scegli tu dove salvarlo, per esempio Google Drive o una cartella del telefono. Il file temporaneo usato dall’APK viene eliminato dopo la scelta, anche quando annulli la condivisione.').replace('Crea Backup','<strong>'+T('Crea Backup')+'</strong>')}</p><div class="row"><button class="btn" data-action="exportBackupQuick">${T('⚡ Backup rapido')}</button><button class="btn primary" data-action="exportBackupFull">${T('🧩 Backup completo multiparte')}</button><button class="btn" data-action="importBackup">${T('↩️ Ripristina backup classico')}</button><button class="btn" data-action="importBackupParts">${T('📂 Ripristina multiparte')}</button></div><p class="meta">${T('Rapido: dati e miniature, senza immagini originali. Completo multiparte: progettato per archivi fino a 1000 opere; salva più file piccoli e poi apre la scelta della cartella, così puoi salvarli in Documenti, Drive o memoria esterna. Compatibile anche con i vecchi file .mair e .json. Ultimo backup:')} ${db.settings.lastBackup?new Date(db.settings.lastBackup).toLocaleString(appLang()==='en'?'en-GB':'it-IT'):T('mai')}</p></div></div></div><h2 id="lists" style="margin-top:28px">${T('Liste personalizzabili')}</h2><div class="grid">${Object.entries({techniques:T('Tecniche'),supports:T('Supporti'),dimensions:T('Dimensioni'),frames:T('Cornici'),statuses:T('Stati'),categories:T('Categorie Biblioteca')}).map(([k,t])=>`<article class="card"><div class="cardbody"><h3>${t}</h3><div class="list-manager">${L[k].map((v,i)=>`<div class="list-row"><input value="${esc(v)}" data-list-key="${k}" data-list-i="${i}"><button class="btn danger" data-action="removeListItem" data-id="${k}:${i}">×</button></div>`).join('')}<button class="btn" data-action="addListItem" data-id="${k}">${T('＋ Aggiungi voce')}</button><button class="btn primary" data-action="saveLists">${T('Salva modifiche')}</button></div></div></article>`).join('')}</div>`}
function openModal(title,html,onSave,saveLabel='Salva'){
  $('#modalTitle').textContent=T(title);
  $('#modalBody').innerHTML=html;
  const saveBtn=$('#modalSave');
  saveBtn.type='button';
  saveBtn.disabled=false;
  saveBtn.textContent=T(saveLabel);
  modal.showModal();
  document.querySelectorAll('[data-add-list]').forEach(b=>b.onclick=()=>{
    const key={technique:'techniques',support:'supports',dimensions:'dimensions',frame:'frames',status:'statuses',category:'categories'}[b.dataset.addList];
    const v=prompt('Nuova voce');
    if(v&&key){db.settings.lists[key].push(v);save();const sel=b.previousElementSibling;sel.insertAdjacentHTML('beforeend',`<option selected>${esc(v)}</option>`)}
  });
  saveBtn.onclick=async e=>{
    e.preventDefault();
    if(saveBtn.disabled)return;
    // controllo email: blocca il salvataggio se un campo email non è valido
    const emailRe=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const form=$('#modalForm');
    let emailErrata=null;
    form.querySelectorAll('input[type=email], input[name=email], input[name=contactEmail]').forEach(inp=>{
      const v=(inp.value||'').trim();
      if(v && !emailRe.test(v)) emailErrata=v;
    });
    if(emailErrata){
      alert(T('Controlla l\u2019indirizzo email: non sembra valido.')+'\n\n'+emailErrata);
      return;
    }
    const original=saveBtn.textContent;
    saveBtn.disabled=true;
    saveBtn.textContent='Salvataggio…';
    try{
      await onSave(new FormData($('#modalForm')));
    }catch(error){
      console.error('Errore salvataggio modulo:',error);
      alert('Non è stato possibile salvare. '+(error?.message||'Errore sconosciuto'));
    }finally{
      if(modal.open){saveBtn.disabled=false;saveBtn.textContent=original;}
    }
  };
}

/* ===== GESTIONE IMMAGINI v17 (massimo 2 MB + miniature leggere) ===== */
const IMG_TARGET_BYTES=2*1024*1024;   // dimensione massima salvata nel database
const IMG_SOURCE_MAX_BYTES=30*1024*1024; // protezione da file sorgente eccezionalmente grandi
const IMG_MAX_SIDE=2400;              // sufficiente per stampa e cataloghi digitali
const THUMB_MAX=480;                  // miniatura per elenchi e ricerche
const THUMB_QUALITY=0.72;
function dataUrlBytes(dataUrl){
  const comma=String(dataUrl||'').indexOf(',');
  const n=comma>=0?String(dataUrl).length-comma-1:String(dataUrl).length;
  return Math.ceil(n*3/4);
}
function canvasDataUrl(canvas,type,quality){
  try{return canvas.toDataURL(type,quality)}catch{return canvas.toDataURL('image/jpeg',quality)}
}
function loadDataImage(dataUrl){return new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=reject;im.src=dataUrl;})}
async function compressImageDataUrl(dataUrl,targetBytes=IMG_TARGET_BYTES,maxSide=IMG_MAX_SIDE){
  if(!dataUrl)return '';
  const im=await loadDataImage(dataUrl);
  let scale=Math.min(1,maxSide/Math.max(im.naturalWidth||im.width,im.naturalHeight||im.height));
  let w=Math.max(1,Math.round((im.naturalWidth||im.width)*scale));
  let h=Math.max(1,Math.round((im.naturalHeight||im.height)*scale));
  let quality=.88,output='';
  for(let pass=0;pass<14;pass++){
    const cv=document.createElement('canvas');cv.width=w;cv.height=h;
    const ctx=cv.getContext('2d',{alpha:false});ctx.fillStyle='#fff';ctx.fillRect(0,0,w,h);ctx.drawImage(im,0,0,w,h);
    output=canvasDataUrl(cv,'image/jpeg',quality);
    if(dataUrlBytes(output)<=targetBytes)return output;
    if(quality>.58)quality-=.08;
    else{w=Math.max(900,Math.round(w*.84));h=Math.max(900,Math.round(h*.84));quality=.78;}
  }
  return output;
}
async function makeThumb(dataUrl){
  const im=await loadDataImage(dataUrl);
  let w=im.naturalWidth||im.width,h=im.naturalHeight||im.height;
  const scale=Math.min(1,THUMB_MAX/Math.max(w,h));w=Math.max(1,Math.round(w*scale));h=Math.max(1,Math.round(h*scale));
  const cv=document.createElement('canvas');cv.width=w;cv.height=h;
  const ctx=cv.getContext('2d',{alpha:false});ctx.fillStyle='#fff';ctx.fillRect(0,0,w,h);ctx.drawImage(im,0,0,w,h);
  return canvasDataUrl(cv,'image/jpeg',THUMB_QUALITY);
}
async function processImage(file){
  if(!file||!file.size)return null;
  if(file.size>IMG_SOURCE_MAX_BYTES)throw new Error('File sorgente troppo grande ('+(file.size/1048576).toFixed(1)+' MB). Limite di sicurezza: 30 MB.');
  const source=await fileData(file);
  const full=await compressImageDataUrl(source,IMG_TARGET_BYTES,IMG_MAX_SIDE);
  const thumb=await makeThumb(full);
  return {full,thumb,sourceBytes:file.size,savedBytes:dataUrlBytes(full)};
}
function artThumb(a){return a.thumb||a.image||'';}

async function fileData(file){return new Promise((res,rej)=>{const r=new FileReader;r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(file)})}async function fileText(file){try{return await file.text()}catch{return ''}}
function anniLista(sel){const y=new Date().getFullYear();const a=[''];for(let i=y+1;i>=1950;i--)a.push(String(i));if(sel&&!a.includes(String(sel)))a.splice(1,0,String(sel));return a;}

function titoloDaNomeFile(nome){
  return String(nome||'Opera')
    .replace(/\.[^.]+$/,'')
    .replace(/[_-]+/g,' ')
    .replace(/\s+/g,' ')
    .trim()||'Opera';
}
function prossimoCodiceOpera(indice=0){
  const nums=(db.artworks||[]).map(a=>{
    const m=String(a.code||'').match(/(\d+)$/);return m?Number(m[1]):0;
  });
  const base=Math.max(db.artworks.length,...nums,0)+1+indice;
  return 'MG-'+String(base).padStart(4,'0');
}
function bulkImportArtworksModal(){
  const opts=(arr,sel='')=>arr.map(x=>`<option ${String(x)===String(sel)?'selected':''}>${esc(x)}</option>`).join('');
  openModal('Importa più opere',`
    <div class="bulk-import-help full">
      <strong>1. Scegli più fotografie</strong>
      <p>Su Android apri la cartella o la galleria, tieni premuta una foto e seleziona le altre. Ogni file diventerà una nuova opera.</p>
    </div>
    <div class="formgrid">
      <div class="field full"><label>Fotografie delle opere</label><input id="bulkArtworkFiles" name="bulkArtworkFiles" type="file" accept="image/*" multiple required><small>Ogni immagine viene ottimizzata automaticamente: massimo 2 MB nel database, più una miniatura leggera. I file vengono elaborati uno alla volta.</small></div>
      ${selectField('Anno comune','bulkYear',anniLista(''),String(new Date().getFullYear()))}
      ${selectField('Tecnica comune','bulkTechnique',db.settings.lists.techniques,'')}
      ${selectField('Supporto comune','bulkSupport',db.settings.lists.supports,'')}
      ${selectField('Dimensioni comuni','bulkDimensions',db.settings.lists.dimensions,'')}
      ${selectField('Cornice comune','bulkFrame',db.settings.lists.frames,'Nessuna')}
      ${selectField('Stato comune','bulkStatus',db.settings.lists.statuses,'Disponibile')}
      ${field('Serie / collezione comune','bulkCollection','')}
      ${field('Posizione comune','bulkLocation','')}
      <div class="field full"><label>Anteprima e titoli</label><div id="bulkArtworkPreview" class="bulk-artwork-preview"><p class="meta">Seleziona le immagini per preparare l’elenco.</p></div></div>
      <div class="field full"><div id="bulkArtworkProgress" class="bulk-progress" hidden><div class="bulk-progress-bar"><span></span></div><p class="meta">Preparazione…</p></div></div>
    </div>`,async fd=>{
      const input=$('#bulkArtworkFiles');
      const files=[...(input?.files||[])];
      if(!files.length){alert('Seleziona almeno una fotografia.');return;}
      const valid=files.filter(f=>f.type.startsWith('image/'));
      if(!valid.length){alert('I file selezionati non sono immagini valide.');return;}
      const rows=[...document.querySelectorAll('.bulk-artwork-row')];
      const chosen=valid.map((f,i)=>({file:f,title:rows[i]?.querySelector('[data-bulk-title]')?.value.trim()||titoloDaNomeFile(f.name),included:rows[i]?.querySelector('[data-bulk-include]')?.checked!==false})).filter(x=>x.included);
      if(!chosen.length){alert('Non ci sono immagini selezionate per l’importazione.');return;}
      const saveBtn=$('#modalSave'); if(saveBtn){saveBtn.disabled=true;saveBtn.textContent='Importazione…';}
      const progress=$('#bulkArtworkProgress');if(progress)progress.hidden=false;
      let imported=0,errors=[];
      for(let i=0;i<chosen.length;i++){
        const f=chosen[i].file;
        try{
          if(progress){progress.querySelector('span').style.width=Math.round((i/chosen.length)*100)+'%';progress.querySelector('p').textContent=`Elaborazione ${i+1} di ${chosen.length}: ${f.name}`;}
          const r=await processImage(f);
          const now=new Date().toISOString();
          db.artworks.unshift({
            id:uid(),title:chosen[i].title||titoloDaNomeFile(f.name),year:fd.get('bulkYear'),
            code:prossimoCodiceOpera(i),technique:fd.get('bulkTechnique'),support:fd.get('bulkSupport'),
            dimensions:fd.get('bulkDimensions'),frame:fd.get('bulkFrame'),status:fd.get('bulkStatus')||'Disponibile',
            price:'',collection:fd.get('bulkCollection'),location:fd.get('bulkLocation'),description:'',notes:'',
            image:r.full,thumb:r.thumb,sourceFileName:f.name,created:now,updated:now
          });
          imported++;
        }catch(err){errors.push(f.name+': '+(err.message||'errore'));}
      }
      if(progress){progress.querySelector('span').style.width='100%';progress.querySelector('p').textContent=`Importate ${imported} opere su ${chosen.length}.`;}
      await save();
      setTimeout(()=>{modal.close();render();toast(imported===1?'1 opera importata':`${imported} opere importate`);if(errors.length)alert('Alcuni file non sono stati importati:\n'+errors.join('\n'));},250);
    },'Importa opere');
  const inp=$('#bulkArtworkFiles');
  if(inp)inp.onchange=()=>{
    const files=[...(inp.files||[])];
    const box=$('#bulkArtworkPreview');
    if(!box)return;
    if(!files.length){box.innerHTML='<p class="meta">Seleziona le immagini per preparare l’elenco.</p>';return;}
    box.innerHTML=files.map((f,i)=>`<div class="bulk-artwork-row ${f.size>IMG_SOURCE_MAX_BYTES?'invalid':''}"><label class="bulk-include"><input type="checkbox" data-bulk-include ${f.size>IMG_SOURCE_MAX_BYTES?'':'checked'} ${f.size>IMG_SOURCE_MAX_BYTES?'disabled':''}><span>${f.size>IMG_SOURCE_MAX_BYTES?'Esclusa':'Includi'}</span></label><div class="bulk-file-info"><strong>${esc(f.name)}</strong><small>${(f.size/1048576).toFixed(2)} MB${f.size>IMG_SOURCE_MAX_BYTES?' · supera 30 MB: esclusa per sicurezza':''}</small></div><input data-bulk-title value="${esc(titoloDaNomeFile(f.name))}" aria-label="Titolo opera ${i+1}" ${f.size>IMG_SOURCE_MAX_BYTES?'disabled':''}></div>`).join('');
  };
}
function artworkModal(a={}){openModal(a.id?'Modifica opera':'Nuova opera',`<div class="formgrid">${field('Titolo','title',a.title,'text','full')}${selectField('Anno','year',anniLista(a.year),a.year||'')}${field('Codice opera','code',a.code||('MG-'+String(db.artworks.length+1).padStart(4,'0')))}${selectField('Tecnica','technique',db.settings.lists.techniques,a.technique)}${selectField('Supporto','support',db.settings.lists.supports,a.support)}${selectField('Dimensioni','dimensions',db.settings.lists.dimensions,a.dimensions)}${selectField('Cornice','frame',db.settings.lists.frames,a.frame)}${selectField('Stato','status',db.settings.lists.statuses,a.status||'Disponibile')}${field('Prezzo (€)','price',a.price,'number')}${field('Serie / collezione','collection',a.collection)}${field('Posizione attuale','location',a.location)}${area('Descrizione','description',a.description)}${area('Note private','notes',a.notes)}<div class="field full"><label>Immagine principale</label><input name="imageFile" type="file" accept="image/*"></div></div>`,async fd=>{const file=fd.get('imageFile');let img=a.image||'',thumb=a.thumb||'';if(file&&file.size){try{const r=await processImage(file);img=r.full;thumb=r.thumb;}catch(err){alert(err.message||'Immagine non valida');return;}}const obj={...a,id:a.id||uid(),title:fd.get('title'),year:fd.get('year'),code:fd.get('code'),technique:fd.get('technique'),support:fd.get('support'),dimensions:fd.get('dimensions'),frame:fd.get('frame'),status:fd.get('status'),price:fd.get('price'),collection:fd.get('collection'),location:fd.get('location'),description:fd.get('description'),notes:fd.get('notes'),image:img,thumb:thumb,updated:new Date().toISOString(),created:a.created||new Date().toISOString()};if(a.id)db.artworks=db.artworks.map(x=>x.id===a.id?obj:x);else db.artworks.unshift(obj);save();modal.close();render();toast('Opera salvata')})}

async function optimizeArtworkImages(){
  const candidates=(db.artworks||[]).filter(a=>a.image && (dataUrlBytes(a.image)>IMG_TARGET_BYTES || !a.thumb || dataUrlBytes(a.thumb)>180000));
  if(!candidates.length){alert('Le immagini sono già ottimizzate.');return;}
  if(!confirm(`Saranno ottimizzate ${candidates.length} immagini.\n\nOgni originale nel database verrà ridotto a massimo 2 MB e verrà rigenerata la miniatura. Prima è consigliato conservare il backup multiparte già esistente.`))return;
  backupProgressOpen('Ottimizzazione immagini');
  let done=0,errors=[];
  try{
    for(const a of candidates){
      backupProgress(Math.round(done/Math.max(1,candidates.length)*100),`Opera ${done+1}/${candidates.length}: ${a.title||a.code||'Senza titolo'}`);
      try{a.image=await compressImageDataUrl(a.image,IMG_TARGET_BYTES,IMG_MAX_SIDE);a.thumb=await makeThumb(a.image);a.updated=new Date().toISOString();}
      catch(e){errors.push((a.title||a.code||'Opera')+': '+(e.message||e));}
      done++;
      if(done%5===0){await save();await new Promise(r=>setTimeout(r,30));}
    }
    await save();backupProgress(100,`Completato: ${done-errors.length} immagini ottimizzate`);
    setTimeout(()=>{try{modal.close()}catch{};render();alert(`Ottimizzazione completata.\n\nImmagini elaborate: ${done}\nErrori: ${errors.length}`+(errors.length?'\n\n'+errors.slice(0,8).join('\n'):''));},400);
  }catch(e){try{modal.close()}catch{};alert('Ottimizzazione interrotta: '+(e.message||e));}
}

function libraryModal(d={}){const arts=db.artworks.map(a=>`<option value="${a.id}" ${d.artworkId===a.id?'selected':''}>${esc(a.title)}</option>`).join('');openModal(d.id?'Modifica documento':'Carica nella Biblioteca',`<div class="formgrid">${!d.id?`<div class="field full"><label>File locale</label><input name="file" type="file" accept=".pdf,.docx,.doc,.txt,image/*" required></div>`:''}${field('Titolo','title',d.title,'text','full')}${field('Autore','author',d.author)}${selectField('Categoria','category',db.settings.lists.categories,d.category||'Catalogo')}${field('Tag separati da virgola','tags',(d.tags||[]).join(', '),'text','full')}${area('Descrizione','description',d.description)}<div class="field full"><label>Opera collegata</label><select name="artworkId"><option value="">Nessuna</option>${arts}</select></div>${area('Appunti di studio','notes',d.notes)}</div>`,async fd=>{let obj={...d,id:d.id||uid(),title:fd.get('title'),author:fd.get('author'),category:fd.get('category'),tags:String(fd.get('tags')||'').split(',').map(x=>x.trim()).filter(Boolean),description:fd.get('description'),artworkId:fd.get('artworkId'),notes:fd.get('notes'),date:d.date||new Date().toISOString()};if(!d.id){const f=fd.get('file');if(!f?.size)return alert('Seleziona un file');obj.name=f.name;obj.mime=f.type||mimeFromName(f.name);obj.data=await fileData(f);if(obj.mime.startsWith('text/')||/\.txt$/i.test(f.name))obj.text=await fileText(f);if(!obj.title)obj.title=f.name.replace(/\.[^.]+$/,'')}if(d.id)db.library=db.library.map(x=>x.id===d.id?obj:x);else db.library.unshift(obj);save();modal.close();render();toast('Documento salvato')})}function mimeFromName(n){if(/\.pdf$/i.test(n))return'application/pdf';if(/\.docx?$/i.test(n))return'application/vnd.openxmlformats-officedocument.wordprocessingml.document';if(/\.(png|jpe?g|webp|gif)$/i.test(n))return'image/*';return'text/plain'}
/* ===== LETTORE DOCUMENTI (trapiantato da LetturArt) ===== */
const LA={pdf:null,pages:[],zoom:1,mode:'continuous',page:1,token:0,observer:null,cont:null,doc:null,resizeTimer:null,lastGesture:0};

function openLibrary(id){
  const d=db.library.find(x=>x.id===id);if(!d)return;
  currentViewer=d;LA.doc=d;
  $('#viewerTitle').textContent=d.title||d.name||'Documento';
  const type=(d.mime||'').toLowerCase();
  const nome=(d.name||'').toLowerCase();
  const isPdf=type.includes('pdf')||nome.endsWith('.pdf');
  const isDocx=type.includes('word')||type.includes('officedocument')||nome.endsWith('.docx')||nome.endsWith('.doc');
  const isImg=type.startsWith('image');
  // barra: per PDF quella completa di LetturArt
  let bar;
  if(isPdf){
    bar='<div class="reader-bar la-bar">'
      +'<button class="btn" data-la-mode="page">Pagina</button>'
      +'<button class="btn active" data-la-mode="continuous">Continuo</button>'
      +'<button class="btn" id="laZoomOut">\u2212</button>'
      +'<span id="laZoomLbl" class="reader-zoom">100%</span>'
      +'<button class="btn" id="laZoomIn">+</button>'
      +'<button class="btn" id="laFit">Adatta</button>'
      +'<span id="laPageLbl" class="reader-zoom">1</span>'
      +'<button class="btn" id="laText">\ud83d\udcc4 Testo</button>'
    +'</div>';
  }else{
    bar='<div class="reader-bar la-bar">'
      +'<button class="btn" id="laZoomOut">\u2212</button>'
      +'<span id="laZoomLbl" class="reader-zoom">100%</span>'
      +'<button class="btn" id="laZoomIn">+</button>'
    +'</div>';
  }
  $('#viewerBody').innerHTML=bar+'<div class="la-stage" id="laStage"><div id="laWrap" class="la-wrap"></div></div>';
  try{viewer.querySelector('.viewer-shell')?.classList.add('reader-open');}catch(e){}
  viewer.showModal();

  if(isPdf){ laStartPdf(d); }
  else if(isDocx){ laStartDocx(d); }
  else if(isImg){ laStartImage(d); }
  else if(type.startsWith('text')||d.text){ document.getElementById('laWrap').innerHTML='<div class="docx-body"><pre style="white-space:pre-wrap;font-family:Georgia,serif">'+esc(d.text||'')+'</pre></div>'; }
  else { document.getElementById('laWrap').innerHTML='<div class="docx-body"><p>Formato non visualizzabile nel lettore.</p></div>'; }
}

async function laArrayBuffer(dataUrl){const r=await fetch(dataUrl);return await r.arrayBuffer();}

/* ---- PDF ---- */
async function laStartPdf(d){
  const wrap=document.getElementById('laWrap');
  wrap.innerHTML='<p class="meta" style="color:#fff;padding:20px">Carico il PDF\u2026</p>';
  try{
    if(!window.pdfjsLib)throw new Error('PDF.js non disponibile');
    try{window.pdfjsLib.GlobalWorkerOptions.workerSrc='vendor/pdf.worker.min.js';}catch(e){}
    const ab=await laArrayBuffer(d.data);
    LA.pdf=await window.pdfjsLib.getDocument({data:ab}).promise;
    LA.zoom=1;LA.mode='continuous';LA.page=1;
    diagLog('LETTORE','PDF aperto '+LA.pdf.numPages+' pagine');
    laBindPdfBar();
    await laRenderPdf();
  }catch(e){
    diagLog('LETTORE-ERRORE',e&&e.message?e.message:String(e));
    wrap.innerHTML='<div class="docx-body"><p>Impossibile aprire il PDF.</p><p class="meta">'+esc(e&&e.message?e.message:String(e))+'</p></div>';
  }
}
function laBindPdfBar(){
  document.querySelectorAll('[data-la-mode]').forEach(b=>b.onclick=async()=>{
    const m=b.dataset.laMode;if(m===LA.mode)return;LA.mode=m;
    document.querySelectorAll('[data-la-mode]').forEach(x=>x.classList.toggle('active',x.dataset.laMode===m));
    await laRenderPdf();
  });
  const zi=document.getElementById('laZoomIn'),zo=document.getElementById('laZoomOut'),zf=document.getElementById('laFit');
  if(zi)zi.onclick=()=>laSetZoom(LA.zoom+0.15);
  if(zo)zo.onclick=()=>laSetZoom(LA.zoom-0.15);
  if(zf)zf.onclick=()=>laSetZoom(1);
  const bt=document.getElementById('laText');
  if(bt)bt.onclick=()=>laTogglePdfText(bt);
  laSetupPinch();
}
function laLbl(){const z=document.getElementById('laZoomLbl');if(z)z.textContent=Math.round(LA.zoom*100)+'%';const p=document.getElementById('laPageLbl');if(p&&LA.pdf)p.textContent=LA.page+' / '+LA.pdf.numPages;}
async function laSetZoom(next){
  if(!LA.pdf)return;
  const stage=document.getElementById('laStage');
  if(!stage)return;
  const oldScrollW=Math.max(stage.scrollWidth,stage.clientWidth);
  const oldScrollH=Math.max(stage.scrollHeight,stage.clientHeight);
  const centerX=(stage.scrollLeft+stage.clientWidth/2)/oldScrollW;
  const centerY=(stage.scrollTop+stage.clientHeight/2)/oldScrollH;
  LA.zoom=Math.max(.6,Math.min(3,+next.toFixed(2)));
  laLbl();
  await laRenderPdf();
  requestAnimationFrame(()=>{
    const newLeft=centerX*stage.scrollWidth-stage.clientWidth/2;
    const newTop=centerY*stage.scrollHeight-stage.clientHeight/2;
    stage.scrollLeft=Math.max(0,Math.min(newLeft,stage.scrollWidth-stage.clientWidth));
    stage.scrollTop=Math.max(0,Math.min(newTop,stage.scrollHeight-stage.clientHeight));
  });
}
function laAvailableWidth(){
  const stage=document.getElementById('laStage');
  if(!stage)return Math.max(280,Math.min(window.innerWidth-24,1050));
  const style=getComputedStyle(stage);
  const inner=stage.clientWidth-(parseFloat(style.paddingLeft)||0)-(parseFloat(style.paddingRight)||0);
  return Math.max(280,Math.min(inner-16,1050));
}
function laPageMetrics(viewport){
  const available=laAvailableWidth();
  const fit=available/viewport.width;
  return {fit,cssWidth:Math.max(1,Math.round(viewport.width*fit*LA.zoom))};
}
async function laRenderPdfCanvas(pageNumber,wrap,token,holder){
  const p=await LA.pdf.getPage(pageNumber);if(token!==LA.token)return;
  const base=p.getViewport({scale:1});
  const metrics=laPageMetrics(base);
  const dpr=Math.min(window.devicePixelRatio||1,2);
  const viewport=p.getViewport({scale:metrics.fit*LA.zoom*dpr});
  const canvas=document.createElement('canvas');
  canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);
  canvas.style.width=metrics.cssWidth+'px';canvas.style.maxWidth='none';canvas.style.height='auto';
  canvas.className='la-page';canvas.dataset.page=String(pageNumber);
  if(holder){holder.innerHTML='';holder.appendChild(canvas);holder.classList.add('rendered');}
  else wrap.appendChild(canvas);
  await p.render({canvasContext:canvas.getContext('2d'),viewport}).promise;
}
function laSetupLazy(token){
  LA.observer?.disconnect();
  LA.observer=new IntersectionObserver(entries=>entries.forEach(en=>{
    if(!en.isIntersecting||en.target.classList.contains('rendered'))return;
    laRenderPdfCanvas(Number(en.target.dataset.page),document.getElementById('laWrap'),token,en.target);
  }),{root:document.getElementById('laStage'),rootMargin:'900px 0px'});
  document.querySelectorAll('#laWrap .la-slot').forEach(x=>LA.observer.observe(x));
}
async function laRenderPdf(){
  if(!LA.pdf)return;
  const token=++LA.token,wrap=document.getElementById('laWrap');
  LA.observer?.disconnect();wrap.innerHTML='';
  const stage=document.getElementById('laStage');if(stage)stage.scrollTop=0;
  if(LA.mode==='page'){
    wrap.className='la-wrap single';
    await laRenderPdfCanvas(LA.page,wrap,token);
    laBindSinglePageTap();
  }else{
    wrap.className='la-wrap continuous';
    for(let i=1;i<=LA.pdf.numPages;i++){
      const p=await LA.pdf.getPage(i),v=p.getViewport({scale:1});
      const metrics=laPageMetrics(v);
      const slot=document.createElement('div');slot.className='la-slot';slot.dataset.page=String(i);
      slot.style.width=metrics.cssWidth+'px';
      slot.style.height=Math.round(v.height*metrics.fit*LA.zoom)+'px';
      slot.innerHTML='<span>Pagina '+i+'</span>';
      wrap.appendChild(slot);
    }
    laSetupLazy(token);
    requestAnimationFrame(laUpdatePage);
  }
  laLbl();
}
function laBindSinglePageTap(){
  const page=document.querySelector('#laWrap .la-page');
  if(!page||!LA.pdf)return;
  page.setAttribute('role','button');
  page.setAttribute('aria-label','Tocca la metà sinistra per tornare indietro o la metà destra per avanzare');
  page.onclick=async e=>{
    if(LA.mode!=='page'||!LA.pdf)return;
    // Evita cambi pagina dopo doppio tap, pinch-to-zoom o trascinamento.
    if(e.detail>1||Date.now()-LA.lastGesture<450)return;
    const rect=page.getBoundingClientRect();
    const indietro=e.clientX<rect.left+rect.width/2;
    if(indietro){
      if(LA.page>1){LA.page--;await laRenderPdf();}
      else toast('Prima pagina');
    }else{
      if(LA.page<LA.pdf.numPages){LA.page++;await laRenderPdf();}
      else toast('Ultima pagina');
    }
  };
}

function laUpdatePage(){
  const stage=document.getElementById('laStage');if(!stage||!LA.pdf)return;
  const slots=[...document.querySelectorAll('#laWrap .la-slot, #laWrap .la-page')];
  const sr=stage.getBoundingClientRect();
  const cur=slots.find(c=>{const r=c.getBoundingClientRect();return r.bottom>sr.top+60&&r.top<sr.bottom-60})||slots[0];
  if(cur){LA.page=Number(cur.dataset.page)||1;laLbl();}
}
async function laTogglePdfText(btn){
  const wrap=document.getElementById('laWrap');
  if(btn.dataset.on==='1'){ btn.dataset.on='';btn.classList.remove('active');btn.textContent='\ud83d\udcc4 Testo';await laRenderPdf();return; }
  btn.dataset.on='1';btn.classList.add('active');btn.textContent='\ud83d\udcc4 Pagine';
  LA.observer?.disconnect();
  wrap.className='la-wrap';wrap.innerHTML='<p class="meta" style="color:#fff;padding:16px">Estraggo il testo\u2026</p>';
  try{
    let out='';
    const n=Math.min(LA.pdf.numPages,60);
    for(let i=1;i<=n;i++){const tc=await (await LA.pdf.getPage(i)).getTextContent();out+=tc.items.map(x=>x.str).join(' ').replace(/\s+/g,' ').trim()+'\n\n';}
    if(out.trim()){wrap.innerHTML='<div class="docx-body pdf-text">'+out.split(/\n\n+/).map(p=>'<p>'+esc(p)+'</p>').join('')+'</div>';}
    else{wrap.innerHTML='<div class="docx-body"><p class="meta">Nessun testo estraibile (PDF di sole immagini). Usa la vista Pagine.</p></div>';}
  }catch(e){wrap.innerHTML='<div class="docx-body"><p class="meta">Estrazione non riuscita.</p></div>';}
}
function laSetupPinch(){
  const stage=document.getElementById('laStage');if(!stage)return;
  stage.onscroll=()=>{if(LA.mode==='continuous')laUpdatePage();};
  let d0=0,z0=1;
  stage.addEventListener('touchstart',e=>{if(e.touches.length===2){LA.lastGesture=Date.now();d0=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);z0=LA.zoom;}},{passive:true});
  let pending=null;
  stage.addEventListener('touchmove',e=>{
    if(e.touches.length===2&&d0){
      LA.lastGesture=Date.now();
      const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
      const z=Math.max(.6,Math.min(3,z0*(d/d0)));
      if(pending)clearTimeout(pending);
      LA.zoom=z;laLbl();
      pending=setTimeout(()=>laSetZoom(z),120);
    }
  },{passive:true});
  stage.addEventListener('touchend',()=>{if(d0){LA.lastGesture=Date.now();d0=0;}},{passive:true});
}

function laHandleResize(){
  clearTimeout(LA.resizeTimer);
  LA.resizeTimer=setTimeout(()=>{
    if(LA.pdf&&viewer.open&&document.getElementById('laStage'))laRenderPdf();
  },180);
}
window.addEventListener('resize',laHandleResize,{passive:true});
window.addEventListener('orientationchange',laHandleResize,{passive:true});


/* ---- DOCX ---- */
async function laStartDocx(d){
  const wrap=document.getElementById('laWrap');
  wrap.innerHTML='<p class="meta" style="padding:16px">Carico il documento\u2026</p>';
  try{
    if(!window.mammoth)throw new Error('Mammoth non disponibile');
    const ab=await laArrayBuffer(d.data);
    const res=await window.mammoth.convertToHtml({arrayBuffer:ab});
    const html=(res.value||'').trim();
    if(html){
      wrap.innerHTML='<div class="docx-body">'+html+'</div>';
      const body=wrap.querySelector('.docx-body');
      body.querySelectorAll('[style]').forEach(el=>{
        el.style.maxWidth='100%';
        if(el.style.width&&(/px|pt|cm|mm|in/.test(el.style.width)))el.style.width='auto';
      });
      body.querySelectorAll('table').forEach(table=>{
        if(table.parentElement?.classList.contains('docx-table-wrap'))return;
        const box=document.createElement('div');box.className='docx-table-wrap';
        table.parentNode.insertBefore(box,table);box.appendChild(table);
      });
    }else{const raw=await window.mammoth.extractRawText({arrayBuffer:ab});wrap.innerHTML='<div class="docx-body"><pre style="white-space:pre-wrap;font-family:Georgia,serif">'+esc(raw.value||'Documento vuoto.')+'</pre></div>';}
    laBindDocxZoom();
  }catch(e){
    diagLog('LETTORE-ERRORE',e&&e.message?e.message:String(e));
    wrap.innerHTML='<div class="docx-body"><p>Impossibile leggere il documento.</p></div>';
  }
}
function laBindDocxZoom(){
  let z=1;const body=document.querySelector('#laWrap .docx-body');
  const zi=document.getElementById('laZoomIn'),zo=document.getElementById('laZoomOut');
  const upd=()=>{if(body)body.style.fontSize=(z)+'em';const l=document.getElementById('laZoomLbl');if(l)l.textContent=Math.round(z*100)+'%';};
  if(zi)zi.onclick=()=>{z=Math.min(2.4,z+0.15);upd();};
  if(zo)zo.onclick=()=>{z=Math.max(.6,z-0.15);upd();};
}
/* ---- IMMAGINE ---- */
function laStartImage(d){
  const wrap=document.getElementById('laWrap');
  wrap.className='la-wrap';
  wrap.innerHTML='<img id="laImg" src="'+d.data+'" style="max-width:100%;height:auto;display:block;margin:0 auto">';
  let z=1;const img=document.getElementById('laImg');
  const zi=document.getElementById('laZoomIn'),zo=document.getElementById('laZoomOut');
  const upd=()=>{if(img)img.style.width=(z*100)+'%';const l=document.getElementById('laZoomLbl');if(l)l.textContent=Math.round(z*100)+'%';};
  if(zi)zi.onclick=()=>{z=Math.min(4,z+0.2);upd();};
  if(zo)zo.onclick=()=>{z=Math.max(.4,z-0.2);upd();};
}

function dataURLtoBlob(u){const [h,b]=u.split(','),m=(h.match(/:(.*?);/)||[])[1]||'application/octet-stream',bin=atob(b),a=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)a[i]=bin.charCodeAt(i);return new Blob([a],{type:m})}
function pdfProjectModal(p={}){const arts=artworkPickerHtml(p.artworkIds||[],'pdfArts');openModal(p.id?'Modifica progetto PDF':'Nuovo progetto PDF',`<div class="formgrid">${field('Titolo','title',p.title||'Catalogo opere','text','full')}${field('Sottotitolo','subtitle',p.subtitle||db.settings.artist,'text','full')}<div class="field"><label>Tipo</label><select name="type">${['Stampa archivio','Catalogo esposizione','Archivio filtrato','Portfolio','Listino prezzi','Dossier galleria'].map(x=>`<option ${p.type===x?'selected':''}>${x}</option>`)}</select></div><div class="field"><label>Tema</label><select name="theme">${['Minimal','Museo','Black Gallery','Editoriale','Atelier','Black & Gold','Ocean','Forest'].map(x=>`<option ${p.theme===x?'selected':''}>${x}</option>`)}</select></div>${area('Testo introduttivo','intro',p.intro)}<div class="field full"><label>Campi visibili</label><div class="row" style="flex-wrap:wrap">${['year:Anno','technique:Tecnica','dimensions:Dimensioni','description:Descrizione','price:Prezzo','status:Stato','frame:Cornice','code:Codice'].map(x=>{const[k,l]=x.split(':');return`<label><input type="checkbox" name="fields" value="${k}" ${!p.fields||p.fields.includes(k)?'checked':''}> ${l}</label>`}).join('')}</div></div><div class="field full"><label>Opere</label>${arts}</div></div>`,fd=>{const obj={...p,id:p.id||uid(),title:fd.get('title'),subtitle:fd.get('subtitle'),type:fd.get('type'),theme:fd.get('theme'),intro:fd.get('intro'),fields:fd.getAll('fields'),artworkIds:fd.getAll('arts'),created:p.created||new Date().toISOString()};if(p.id)db.pdfProjects=db.pdfProjects.map(x=>x.id===p.id?obj:x);else db.pdfProjects.unshift(obj);save();modal.close();previewId=obj.id;route='pdfpreview';location.hash='pdfpreview';render();toast('Progetto PDF salvato: puoi aprire il documento')});bindArtworkPicker('pdfArts')}
/* ===================== CERTIFICATI ===================== */
const CERT_TEMPLATES={
  autenticita:{label:'Certificato di Autenticità',icon:'✦',
    title:"Certificato di Autenticità",
    fields:['code','year','technique','support','dimensions','frame','edition','signature'],
    body:"Con il presente documento l'artista dichiara che l'opera qui descritta è autentica, originale e realizzata di propria mano. Il certificato è parte integrante dell'opera e ne attesta la piena autenticità."},
  vendita:{label:'Certificato di Vendita / Cessione',icon:'🧾',
    title:"Certificato di Vendita",
    fields:['code','year','technique','dimensions','price','buyer','place','signature'],
    body:"Si attesta che l'opera qui descritta è stata ceduta e venduta all'acquirente indicato. Con l'acquisto si trasferisce la proprietà dell'opera, restando all'artista i diritti morali e d'autore secondo la legge vigente."},
  provenienza:{label:'Certificato di Provenienza',icon:'📜',
    title:"Certificato di Provenienza",
    fields:['code','year','technique','dimensions','collection','provenance','signature'],
    body:"Il presente documento attesta la provenienza e la storia dell'opera qui descritta, garantendone la tracciabilità e l'appartenenza dichiarata."},
  esposizione:{label:'Attestato di Esposizione',icon:'🏛️',
    title:"Attestato di Esposizione",
    fields:['code','year','technique','dimensions','exhibition','place','date','signature'],
    body:"Si attesta che l'opera qui descritta è stata esposta nell'ambito dell'esposizione indicata, come parte del percorso espositivo e curatoriale dell'artista."},
  donazione:{label:'Certificato di Donazione',icon:'🎁',
    title:"Certificato di Donazione",
    fields:['code','year','technique','dimensions','donee','place','date','signature'],
    body:"Con il presente atto l'artista dichiara di donare l'opera qui descritta al beneficiario indicato, a titolo gratuito, trasferendone la proprietà."}
};
const CERT_FIELD_LABELS={code:'Codice opera',year:'Anno',technique:'Tecnica',support:'Supporto',dimensions:'Dimensioni',frame:'Cornice',edition:'Edizione / Tiratura',price:'Prezzo / Valore',buyer:'Acquirente',donee:'Beneficiario',collection:'Collezione',provenance:'Provenienza',exhibition:'Esposizione',place:'Luogo',date:'Data',signature:'Firma dell\'artista'};
const CERT_THEMES=[['classic','Classico oro'],['museum','Museo chiaro'],['dark','Nero galleria'],['editorial','Editoriale'],['minimal','Minimal']];

function certificatesView(){
  return `${section('Certificati','<button class="btn primary" data-action="newCertificate">＋ Nuovo certificato</button>')}
  <section class="hero"><h2>✦ Certificati personalizzabili</h2><p>Scegli il modello, seleziona il quadro dall'archivio, personalizza campi, testo, tema e firma. Poi stampa o salva in PDF. Tutto resta locale.</p></section>
  <div class="template-row">${Object.values(CERT_TEMPLATES).map(t=>`<span class="badge">${t.icon} ${esc(t.label)}</span>`).join('')}</div>
  <div class="toolbar"><input id="certSearch" class="search" placeholder="Cerca per titolo, numero, opera, acquirente, luogo…"></div>
  <div id="certGrid" class="grid">${db.certificates.map(certCard).join('')||empty('✦','Nessun certificato creato.','<button class="btn primary" data-action="newCertificate">Crea il primo certificato</button>')}</div>`;
}
function certCard(c){const tpl=CERT_TEMPLATES[c.template]||CERT_TEMPLATES.autenticita;const a=db.artworks.find(x=>x.id===c.artworkId);return `<article class="card"><div class="cardbody"><div class="row spread"><h3>${esc(c.title||tpl.title)}</h3><span class="badge">${tpl.icon}</span></div><div class="meta">${esc(tpl.label)}${a?' · '+esc(a.title):''}${c.certNumber?' · N. '+esc(c.certNumber):''}</div><p class="meta">${esc(c.place||'')} ${c.date?'· '+fmtDate(c.date):''}</p><div class="row" style="margin-top:12px"><button class="btn primary" data-action="openCertificate" data-id="${c.id}">Apri</button><button class="btn" data-action="editCertificate" data-id="${c.id}">Modifica</button><button class="btn danger" data-action="deleteCertificate" data-id="${c.id}">Elimina</button></div></div></article>`;}

function certificateModal(c={}){
  const isNew=!c.id;
  const tplKey=c.template||'autenticita';
  const arts=db.artworks.map(a=>`<option value="${a.id}" ${c.artworkId===a.id?'selected':''}>${esc(a.title||'Senza titolo')}</option>`).join('');
  const extraFieldsHtml=fld=>fld.filter(k=>!['signature'].includes(k)).map(k=>{
    const v=(c.values&&c.values[k])||'';
    return `<label><input type="checkbox" name="fields" value="${k}" ${(!c.fields||c.fields.includes(k))?'checked':''}> ${esc(CERT_FIELD_LABELS[k]||k)}</label>`;
  }).join('');
  openModal(isNew?'Nuovo certificato':'Modifica certificato',`<div class="formgrid">
    <div class="field full"><label>Modello di certificato</label><select name="template">${Object.entries(CERT_TEMPLATES).map(([k,t])=>`<option value="${k}" ${tplKey===k?'selected':''}>${t.icon} ${esc(t.label)}</option>`).join('')}</select></div>
    <div class="field full"><label>Quadro / opera (dall'archivio)</label><select name="artworkId"><option value="">— Nessuna opera / compilazione manuale —</option>${arts}</select></div>
    ${field('Titolo del certificato','title',c.title,'text','full')}
    ${field('Numero certificato','certNumber',c.certNumber||('CERT-'+String(db.certificates.length+1).padStart(4,'0')))}
    ${field('Luogo','place',c.place)}
    ${field('Data','date',c.date||new Date().toISOString().slice(0,10),'date')}
    ${field('Nome artista','artist',c.artist||db.settings.artist,'text','full')}
    ${area('Testo del certificato','body',c.body||CERT_TEMPLATES[tplKey].body)}
    ${field('Acquirente / Beneficiario','buyer',c.buyer)}
    ${field('Provenienza / Collezione','provenance',c.provenance)}
    ${field('Esposizione','exhibition',c.exhibition)}
    ${field('Edizione / Tiratura','edition',c.edition)}
    ${field('Valore / Prezzo (€)','price',c.price,'number')}
    <div class="field"><label>Tema grafico</label><select name="theme">${CERT_THEMES.map(([v,l])=>`<option value="${v}" ${c.theme===v?'selected':''}>${l}</option>`).join('')}</select></div>
    <div class="field"><label>Firma</label><select name="sigMode"><option value="text" ${c.sigMode!=='image'?'selected':''}>Firma testuale (nome)</option><option value="image" ${c.sigMode==='image'?'selected':''}>Immagine firma</option></select></div>
    <div class="field full"><label>Immagine firma (facoltativa, PNG con sfondo trasparente)</label><input name="sigFile" type="file" accept="image/*"></div>
    <div class="field full"><label>Campi da mostrare nel certificato</label><div class="row" style="flex-wrap:wrap">${extraFieldsHtml(CERT_TEMPLATES[tplKey].fields)}</div></div>
  </div>`,async fd=>{
    const sigF=fd.get('sigFile');
    const obj={...c,id:c.id||uid(),
      template:fd.get('template'),
      artworkId:fd.get('artworkId'),
      title:fd.get('title'),
      certNumber:fd.get('certNumber'),
      place:fd.get('place'),
      date:fd.get('date'),
      artist:fd.get('artist'),
      body:fd.get('body'),
      buyer:fd.get('buyer'),
      provenance:fd.get('provenance'),
      exhibition:fd.get('exhibition'),
      edition:fd.get('edition'),
      price:fd.get('price'),
      theme:fd.get('theme'),
      sigMode:fd.get('sigMode'),
      fields:fd.getAll('fields'),
      signatureImg:sigF&&sigF.size?await fileData(sigF):(c.signatureImg||''),
      updated:new Date().toISOString(),created:c.created||new Date().toISOString()};
    if(c.id)db.certificates=db.certificates.map(x=>x.id===c.id?obj:x);else db.certificates.unshift(obj);
    save();modal.close();certPreviewId=obj.id;go('certpreview');toast('Certificato salvato');
  });
}

let certPreviewId=null;
function certPreviewView(){
  const c=db.certificates.find(x=>x.id===certPreviewId);
  if(!c)return empty('✦','Certificato non trovato.');
  const tpl=CERT_TEMPLATES[c.template]||CERT_TEMPLATES.autenticita;
  const a=db.artworks.find(x=>x.id===c.artworkId)||{};
  const F=c.fields||tpl.fields;
  const rowsSrc={
    code:a.code||'', year:a.year||'', technique:a.technique||'', support:a.support||'',
    dimensions:a.dimensions||'', frame:a.frame||'',
    edition:c.edition||'', price:c.price?euro(c.price):'',
    buyer:c.buyer||'', donee:c.buyer||'', collection:a.collection||c.provenance||'',
    provenance:c.provenance||'', exhibition:c.exhibition||'', place:c.place||'', date:c.date?fmtDate(c.date):''
  };
  const rows=F.filter(k=>k!=='signature'&&rowsSrc[k]).map(k=>`<tr><td class="ck">${esc(CERT_FIELD_LABELS[k]||k)}</td><td>${esc(rowsSrc[k])}</td></tr>`).join('');
  const sig=c.sigMode==='image'&&c.signatureImg?`<img class="cert-sig-img" src="${c.signatureImg}" alt="firma">`:`<span class="cert-sig-name">${esc(c.artist||db.settings.artist)}</span>`;
  return `<div class="toolbar no-print"><button class="btn" data-action="backCert">← Certificati</button><button class="btn primary" data-action="printCert">📄 Apri documento</button><button class="btn" data-action="shareCert">✍️ Copia testo</button></div>
  <article class="cert-page" data-cert-theme="${esc(c.theme||'classic')}">
    <div class="cert-frame">
      <header class="cert-head"><div class="cert-mark">M</div><small>${esc(tpl.label)}</small><h1>${esc(c.title||tpl.title)}</h1>${c.certNumber?`<p class="cert-num">N. ${esc(c.certNumber)}</p>`:''}</header>
      ${a.image?`<div class="cert-img"><img src="${a.image}" alt="${esc(a.title||'')}"></div>`:''}
      ${a.title?`<h2 class="cert-artwork">«${esc(a.title)}»</h2>`:''}
      <p class="cert-body">${esc(c.body||tpl.body)}</p>
      ${rows?`<table class="cert-table"><tbody>${rows}</tbody></table>`:''}
      <div class="cert-footer">
        <div class="cert-sig">${sig}<hr><small>${esc(c.artist||db.settings.artist)} · Artista</small></div>
        <div class="cert-meta"><small>${esc(c.place||'')}${c.place&&c.date?', ':''}${c.date?fmtDate(c.date):''}</small></div>
      </div>
      <p class="cert-note">${esc(db.settings.email||'')}${db.settings.email?' · ':''}www.dandreart.info</p>
    </div>
  </article>`;
}

function shareCertText(c){const tpl=CERT_TEMPLATES[c.template]||CERT_TEMPLATES.autenticita;const a=db.artworks.find(x=>x.id===c.artworkId);return `${tpl.label}\n${c.title||tpl.title}${c.certNumber?' · N. '+c.certNumber:''}\n${a?'Opera: '+a.title+'\\n':''}${c.body||tpl.body}\n${c.artist||db.settings.artist}${c.place?' · '+c.place:''}${c.date?' · '+fmtDate(c.date):''}`;}

/* ===== ESPORTAZIONE DOCUMENTI (compatibile app Android) ===== */
function docShell(title,inner,extraCss){return `<!DOCTYPE html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><style>
*{box-sizing:border-box}body{font-family:Georgia,'Times New Roman',serif;margin:0;padding:24px;background:#fff;color:#111;line-height:1.6}
.doc-actions{position:sticky;top:0;background:#fff;padding:12px 0;border-bottom:1px solid #ddd;margin-bottom:20px;display:flex;gap:10px;flex-wrap:wrap}
.doc-actions button{font:600 1rem system-ui;padding:12px 20px;border:0;border-radius:8px;background:#8a6a1f;color:#fff}
h1{font-size:1.9rem;margin:.2em 0}h2{font-size:1.3rem}
table{width:100%;border-collapse:collapse;margin:16px 0}td{padding:9px 12px;border-bottom:1px solid #ddd}
img{max-width:100%;height:auto}
.art{display:flex;gap:20px;margin:26px 0;page-break-inside:avoid;flex-wrap:wrap}
.art img{max-width:260px;border:1px solid #ccc}
.art>div{flex:1 1 240px}
@media print{.doc-actions{display:none}body{padding:0}}
${extraCss||''}
</style></head><body><div class="doc-actions"><button onclick="window.print()">🖨️ Stampa / Salva come PDF</button></div>${inner}</body></html>`;}

function safeName(t){return String(t||'documento').replace(/[^\w\sÀ-ÿ-]/g,'').trim().replace(/\s+/g,'_').slice(0,50);}
function certDocHtml(c){
  const tpl=CERT_TEMPLATES[c.template]||CERT_TEMPLATES.autenticita;
  const a=db.artworks.find(x=>x.id===c.artworkId)||{};
  const F=c.fields||tpl.fields;
  const src={code:a.code||'',year:a.year||'',technique:a.technique||'',support:a.support||'',dimensions:a.dimensions||'',frame:a.frame||'',edition:c.edition||'',price:c.price?euro(c.price):'',buyer:c.buyer||'',donee:c.buyer||'',collection:a.collection||c.provenance||'',provenance:c.provenance||'',exhibition:c.exhibition||'',place:c.place||'',date:c.date?fmtDate(c.date):''};
  const rows=F.filter(k=>k!=='signature'&&src[k]).map(k=>'<tr><td style="font-weight:700;width:40%">'+esc(CERT_FIELD_LABELS[k]||k)+'</td><td>'+esc(src[k])+'</td></tr>').join('');
  const sig=(c.sigMode==='image'&&c.signatureImg)?'<img src="'+c.signatureImg+'" style="max-height:80px">':'<span style="font-style:italic;font-size:1.6rem">'+esc(c.artist||db.settings.artist)+'</span>';
  return '<div style="border:2px solid #8a6a1f;padding:26px">'
   +'<div style="text-align:center;margin-bottom:18px"><small style="letter-spacing:.2em;text-transform:uppercase;color:#8a6a1f;font-weight:700">'+esc(tpl.label)+'</small>'
   +'<h1 style="margin:.2em 0">'+esc(c.title||tpl.title)+'</h1>'
   +(c.certNumber?'<p style="color:#8a6a1f;font-weight:700">N. '+esc(c.certNumber)+'</p>':'')+'</div>'
   +(a.image?'<div style="text-align:center;margin:16px 0"><img src="'+a.image+'" style="max-height:340px;border:1px solid #ccc"></div>':'')
   +(a.title?'<h2 style="text-align:center;font-style:italic">\u00ab'+esc(a.title)+'\u00bb</h2>':'')
   +'<p style="text-align:justify">'+esc(c.body||tpl.body)+'</p>'
   +(rows?'<table>'+rows+'</table>':'')
   +'<div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:40px;flex-wrap:wrap;gap:16px">'
   +'<div style="text-align:center;min-width:200px">'+sig+'<hr style="border:0;border-top:1px solid #111;margin:6px 0 4px"><small>'+esc(c.artist||db.settings.artist)+' \u00b7 Artista</small></div>'
   +'<div><small>'+esc(c.place||'')+(c.place&&c.date?', ':'')+(c.date?fmtDate(c.date):'')+'</small></div></div></div>';
}
function pdfDocHtml(p){
  const arts=(p.artworkIds||[]).map(id=>db.artworks.find(a=>a.id===id)).filter(Boolean);
  const F=p.fields||[];
  const riga=(lab,val)=>val?'<p><strong>'+lab+':</strong> '+esc(val)+'</p>':'';
  return '<header style="border-bottom:3px solid #8a6a1f;padding-bottom:18px;margin-bottom:24px">'
   +'<small>MAIR GO! \u00b7 '+esc(p.type||'')+'</small><h1 style="margin:.2em 0">'+esc(p.title||'')+'</h1>'
   +'<h2>'+esc(p.subtitle||'')+'</h2><p>'+esc(p.intro||'')+'</p></header>'
   +arts.map(a=>'<section class="art"><div>'+(a.image?'<img src="'+a.image+'">':'')+'</div><div>'
     +'<h2>'+esc(a.title||'')+'</h2>'
     +(F.includes('year')?riga('Anno',a.year):'')
     +(F.includes('code')?riga('Codice',a.code):'')
     +(F.includes('technique')?riga('Tecnica',a.technique?(a.technique+(a.support?' su '+a.support:'')):''):'')
     +(F.includes('dimensions')?riga('Dimensioni',a.dimensions):'')
     +(F.includes('frame')?riga('Cornice',a.frame):'')
     +(F.includes('status')?riga('Stato',a.status):'')
     +(F.includes('price')&&a.price?'<p><strong>Prezzo:</strong> '+euro(a.price)+'</p>':'')
     +(F.includes('description')&&a.description?'<p>'+esc(a.description)+'</p>':'')
     +'</div></section>').join('')
   +'<footer style="border-top:1px solid #bbb;padding-top:16px;margin-top:32px"><strong>'+esc(db.settings.artist)+'</strong><br>'+esc(db.settings.email||'')+' '+esc(db.settings.phone||'')+'</footer>';
}
function receiptDocHtml(s){
  const a=db.artworks.find(x=>x.id===s.artworkId),c=db.clients.find(x=>x.id===s.clientId);
  return '<h1>Ricevuta / riepilogo vendita</h1><p><strong>'+esc(db.settings.artist)+'</strong></p>'
   +'<table><tr><td>Opera</td><td>'+esc(a&&a.title||'\u2014')+'</td></tr>'
   +'<tr><td>Cliente</td><td>'+esc(c&&c.name||'\u2014')+'</td></tr>'
   +'<tr><td>Data</td><td>'+fmtDate(s.date)+'</td></tr>'
   +'<tr><td>Totale</td><td>'+euro(s.total)+'</td></tr>'
   +'<tr><td>Incassato</td><td>'+euro(s.paid)+'</td></tr>'
   +'<tr><td>Metodo</td><td>'+esc(s.paymentMethod||'\u2014')+'</td></tr></table>'
   +'<p>'+esc(s.notes||'')+'</p><p style="margin-top:36px">Firma _______________________</p>';
}

function certPlain(c){const tpl=CERT_TEMPLATES[c.template]||CERT_TEMPLATES.autenticita;const a=db.artworks.find(x=>x.id===c.artworkId);const F=c.fields||tpl.fields;const src={code:a?.code,year:a?.year,technique:a?.technique,support:a?.support,dimensions:a?.dimensions,frame:a?.frame,edition:c.edition,price:c.price?euro(c.price):'',buyer:c.buyer,donee:c.buyer,collection:a?.collection||c.provenance,provenance:c.provenance,exhibition:c.exhibition,place:c.place,date:c.date?fmtDate(c.date):''};
const righe=F.filter(k=>k!=='signature'&&src[k]).map(k=>`${CERT_FIELD_LABELS[k]||k}: ${src[k]}`).join('\n');
return `${tpl.label}\n${c.title||tpl.title}${c.certNumber?'\nN. '+c.certNumber:''}\n\n${a?'Opera: '+(a.title||'')+'\n':''}${righe?righe+'\n':''}\n${c.body||tpl.body}\n\n${c.artist||db.settings.artist}${c.place?'\n'+c.place:''}${c.date?' · '+fmtDate(c.date):''}`;}
function pdfPlain(p){const arts=(p.artworkIds||[]).map(id=>db.artworks.find(a=>a.id===id)).filter(Boolean);
return `${p.title||''}\n${p.subtitle||''}\n\n${p.intro||''}\n\n`+arts.map(a=>`• ${a.title||''}${a.year?' ('+a.year+')':''}${a.technique?' — '+a.technique:''}${a.dimensions?' — '+a.dimensions:''}`).join('\n')+`\n\n${db.settings.artist}`;}
function receiptPlain(s){const a=db.artworks.find(x=>x.id===s.artworkId),c=db.clients.find(x=>x.id===s.clientId);
return `Ricevuta vendita\n${db.settings.artist}\n\nOpera: ${a?.title||'—'}\nCliente: ${c?.name||'—'}\nData: ${fmtDate(s.date)}\nTotale: ${euro(s.total)}\nIncassato: ${euro(s.paid)}\nMetodo: ${s.paymentMethod||'—'}`;}

function textEditorOpen(title,text){
  const host=document.createElement('div');host.id='txteditor';
  host.innerHTML=`<div class="dv-bar">
    <button class="btn" id="txClose">← Chiudi</button>
    <button class="btn primary" id="txCopy">📋 Copia</button>
    <button class="btn" id="txShare">📤 Condividi</button>
  </div><div class="tx-wrap"><textarea id="txArea" spellcheck="false"></textarea></div>`;
  document.body.appendChild(host);
  const css=document.createElement('style');css.id='txteditor-css';
  css.textContent=`#txteditor{position:fixed;inset:0;z-index:9999;background:var(--panel,#fff);display:flex;flex-direction:column}
  #txteditor .dv-bar{display:flex;gap:8px;padding:10px;border-bottom:1px solid #ccc;flex-wrap:wrap}
  #txteditor .tx-wrap{flex:1;padding:12px;display:flex}
  #txteditor textarea{flex:1;width:100%;border:1px solid #ccc;border-radius:8px;padding:14px;font:1rem/1.6 system-ui;resize:none;background:#fff;color:#111}`;
  document.head.appendChild(css);
  const ta=host.querySelector('#txArea');ta.value=text;
  const closeIt=()=>{host.remove();css.remove()};
  host.querySelector('#txClose').onclick=closeIt;
  host.querySelector('#txCopy').onclick=async()=>{try{await navigator.clipboard.writeText(ta.value);toast('Testo copiato')}catch(e){ta.select();toast('Seleziona e copia')}};
  host.querySelector('#txShare').onclick=async()=>{try{if(navigator.share)await navigator.share({title,text:ta.value});else{await navigator.clipboard.writeText(ta.value);toast('Testo copiato')}}catch(e){}};
}

/* ===== IMPAGINAZIONE PDF PROFESSIONALE ===== */
const PDF_DEFAULT={
  formato:'a4', orientamento:'p',
  mTop:18,mBottom:20,mLeft:16,mRight:16,
  font:'times', corpo:11, titolo:24, colore:'#8a6a1f',
  copertina:true, intro:true, indice:true, colophon:true, numeri:true,
  intestazione:true, imgMax:70, imgPos:'centro',
  operaPerPagina:true, riempi:true
};
function pdfCfg(){return Object.assign({},PDF_DEFAULT,db.settings.pdf||{});}
const PDF_FONTS=[['times','Times (classico)'],['helvetica','Helvetica (moderno)'],['courier','Courier (macchina)']];
const PDF_FORMATI=[['a4','A4 (21×29,7)'],['a5','A5 (14,8×21)'],['letter','Letter (21,6×27,9)'],['a3','A3 (29,7×42)']];

function pdfMisure(pdf,C){
  C=C||pdfCfg();
  const pw=pdf.internal.pageSize.getWidth(), ph=pdf.internal.pageSize.getHeight();
  return {pw,ph,mt:C.mTop,mb:C.mBottom,ml:C.mLeft,mr:C.mRight,
    utileW:pw-C.mLeft-C.mRight, utileH:ph-C.mTop-C.mBottom};
}

// disegna un elemento DOM in una pagina, scalandolo per stare nell'area utile
async function pdfBloccoInPagina(pdf,el,opt){
  const C=(opt&&opt.C)||pdfCfg();
  const M=pdfMisure(pdf,C);
  const canvas=await html2canvas(el,{scale:2,backgroundColor:'#ffffff',useCORS:true,logging:false});
  let w=M.utileW, h=canvas.height*w/canvas.width;
  const maxH=(opt&&opt.maxH)||M.utileH;
  if(h>maxH){h=maxH;w=canvas.width*h/canvas.height;}
  const x=M.ml+(M.utileW-w)/2;
  const y=(opt&&opt.y!=null)?opt.y:M.mt;
  pdf.addImage(canvas.toDataURL('image/jpeg',0.92),'JPEG',x,y,w,h);
  return y+h;
}

// crea un contenitore fuori schermo per rendere i blocchi alla larghezza giusta
function pdfStage(C){
  C=C||pdfCfg();
  const fam=C.font==='helvetica'?'Helvetica,Arial,sans-serif':(C.font==='courier'?'Courier New,monospace':'Georgia,Times New Roman,serif');
  const st=document.createElement('div');
  st.setAttribute('style','position:fixed;left:-10000px;top:0;width:794px;background:#fff;color:#111;line-height:1.6;font-family:'+fam+';font-size:'+(C.corpo*1.35)+'px');
  document.body.appendChild(st);
  return st;
}

function pdfPiePagina(pdf,num,tot,testo,C){
  C=C||pdfCfg();
  const M=pdfMisure(pdf,C);
  pdf.setFontSize(8);pdf.setTextColor(120);
  if(testo)pdf.text(String(testo).slice(0,70),M.ml,M.ph-9);
  pdf.text(String(num)+' / '+String(tot),M.pw-M.mr,M.ph-9,{align:'right'});
  pdf.setTextColor(0);
}

// genera il PDF impaginato di un progetto catalogo
// dimensioni reali di un'immagine (per proporzioni nel PDF)
function pdfImgSize(dataUrl){
  return new Promise((res)=>{
    try{const im=new Image();im.onload=()=>res({w:im.width,h:im.height});im.onerror=()=>res(null);im.src=dataUrl;}
    catch(e){res(null);}
  });
}
function pdfImgFormat(dataUrl){
  const m=String(dataUrl||'').match(/^data:image\/([a-z+]+)/i);
  const t=(m?m[1]:'jpeg').toLowerCase();
  if(t.includes('png'))return 'PNG';
  if(t.includes('webp'))return 'WEBP';
  return 'JPEG';
}
// ridimensiona un'immagine per il PDF: riduce peso e memoria (evita crash con molte opere)
function pdfImgRidotta(dataUrl,maxLato,jpegQ){
  return new Promise((res)=>{
    try{
      const im=new Image();
      im.onload=()=>{
        try{
          let w=im.width,h=im.height;
          const lato=maxLato||1100;
          if(w>lato||h>lato){
            if(w>=h){h=Math.round(h*lato/w);w=lato;}
            else{w=Math.round(w*lato/h);h=lato;}
          }
          const cv=document.createElement('canvas');cv.width=w;cv.height=h;
          const cx=cv.getContext('2d');
          cx.fillStyle='#ffffff';cx.fillRect(0,0,w,h);
          cx.drawImage(im,0,0,w,h);
          const out=cv.toDataURL('image/jpeg',jpegQ||0.82);
          cv.width=cv.height=0; // libera subito la memoria del canvas
          res({data:out,w,h});
        }catch(e){res(null);}
      };
      im.onerror=()=>res(null);
      im.src=dataUrl;
    }catch(e){res(null);}
  });
}

function scegliModalitaCatalogo(nOp){
  return new Promise(risolvi=>{
    const QN={nome:'normale',lato:1100,jpeg:0.82};
    const QR={nome:'ridotta',lato:700,jpeg:0.68};
    const html='<div class="catopt">'
      +'<p class="meta">Il catalogo contiene <strong>'+nOp+' opere</strong>. Con molte immagini un PDF unico pu\u00f2 essere pesante. Scegli come procedere:</p>'
      +'<button class="btn catopt-b" data-scelta="unico-normale">\ud83d\udcc4 PDF unico \u00b7 qualit\u00e0 normale<small>Immagini nitide. Su telefoni con poca memoria pu\u00f2 faticare.</small></button>'
      +'<button class="btn catopt-b" data-scelta="unico-ridotta">\ud83d\udcc4 PDF unico \u00b7 qualit\u00e0 ridotta<small>Immagini pi\u00f9 leggere: un solo file, meno rischio. Provalo e vedi se ti piace.</small></button>'
      +'<button class="btn catopt-b primary" data-scelta="diviso">\ud83e\udde9 Diviso in pi\u00f9 PDF<small>Pi\u00f9 file da 100 opere. Sicuro: non va mai in crash.</small></button>'
      +'</div>';
    openModal('Catalogo con molte opere',html,null,' ');
    const sav=document.getElementById('modalSave');if(sav)sav.style.display='none';
    document.querySelectorAll('#modalBody [data-scelta]').forEach(b=>b.onclick=()=>{
      if(sav)sav.style.display='';
      const sc=b.dataset.scelta;modal.close();
      if(sc==='unico-normale')risolvi({modo:'unico',q:QN});
      else if(sc==='unico-ridotta')risolvi({modo:'unico',q:QR});
      else if(sc==='diviso')risolvi({modo:'diviso',q:QR});
    });
    modal.addEventListener('close',function once(){modal.removeEventListener('close',once);if(sav)sav.style.display='';risolvi(null);},{once:true});
  });
}

async function generaCatalogoDiviso(dato,scelta,nOp){
  const perParte=100;
  const parti=Math.ceil(nOp/perParte);
  const titoloBase=(dato.title||'Catalogo').replace(/[\\/:*?"<>|]/g,'_');
  toast('Genero '+parti+' PDF\u2026');
  for(let i=0;i<parti;i++){
    const da=i*perParte, a=Math.min((i+1)*perParte,nOp);
    diagLog('PDF','parte '+(i+1)+'/'+parti+' opere '+da+'-'+a);
    try{
      const pdf=await pdfCatalogoImpaginato(dato,{...scelta.q,da,a});
      const nome=titoloBase+' - parte '+(i+1)+' di '+parti+'.pdf';
      const blob=pdf.output('blob');
      await salvaFileBlob(nome,blob,'application/pdf');
      toast('Salvata parte '+(i+1)+' di '+parti);
      await new Promise(r=>setTimeout(r,300));
    }catch(e){
      diagLog('PDF-PARTE-ERRORE',e&&e.message?e.message:String(e));
      alert('Problema nella parte '+(i+1)+'. Le parti gi\u00e0 salvate sono al sicuro.');
      return;
    }
  }
  alert('Fatto! Catalogo salvato in '+parti+' file PDF nella cartella MAIR GO.');
}

async function pdfCatalogoImpaginato(p,opt){
  opt=opt||{};
  const qLato=opt.lato||1100;
  const qJpeg=opt.jpeg||0.82;
  const C=pdfCfg();
  const {jsPDF}=window.jspdf;
  const pdf=new jsPDF({orientation:C.orientamento,unit:'mm',format:C.formato});
  const M=pdfMisure(pdf,C);
  let arts=(p.artworkIds||[]).map(id=>db.artworks.find(a=>a.id===id)).filter(Boolean);
  if(opt.da!=null&&opt.a!=null){arts=arts.slice(opt.da,opt.a);}
  const F=p.fields||[];
  const autore=db.settings.artist||'';
  const col=C.colore||'#8a6a1f';
  const rgb=(hex=>{const h=hex.replace('#','');return [parseInt(h.slice(0,2),16)||138,parseInt(h.slice(2,4),16)||106,parseInt(h.slice(4,6),16)||31];})(col);
  const fontName=C.font==='helvetica'?'helvetica':(C.font==='courier'?'courier':'times');
  let prima=true;
  const nuovaPagina=()=>{if(prima)prima=false;else pdf.addPage();};
  // scrive testo con a-capo automatico, ritorna la nuova y
  const testo=(str,x,y,opt={})=>{
    if(!str)return y;
    const size=opt.size||11, lh=opt.lh||size*0.42;
    pdf.setFont(fontName,opt.style||'normal');
    pdf.setFontSize(size);
    if(opt.color)pdf.setTextColor(opt.color[0],opt.color[1],opt.color[2]);else pdf.setTextColor(30,30,30);
    const larg=opt.w||M.utileW;
    const righe=pdf.splitTextToSize(String(str),larg);
    for(const r of righe){
      if(y>M.ph-M.mb){pdf.addPage();y=M.mt;}
      pdf.text(r,x,y,{align:opt.align||'left'});
      y+=lh;
    }
    return y;
  };
  const linea=(y)=>{pdf.setDrawColor(rgb[0],rgb[1],rgb[2]);pdf.setLineWidth(0.4);pdf.line(M.ml,y,M.pw-M.mr,y);return y+1;};

  try{
    // ---- COPERTINA ----
    if(C.copertina){
      nuovaPagina();
      let y=M.ph*0.32;
      pdf.setDrawColor(rgb[0],rgb[1],rgb[2]);pdf.setLineWidth(1.2);
      pdf.rect(M.ml+6,y-4,M.utileW-12,M.ph*0.42);
      y+=14;
      y=testo((p.type||'Catalogo').toUpperCase(),M.pw/2,y,{size:12,style:'bold',align:'center',color:rgb,lh:10});
      y+=6;
      y=testo(p.title||'',M.pw/2,y,{size:26,style:'bold',align:'center',lh:12,w:M.utileW-24});
      if(p.subtitle&&p.subtitle.trim()&&p.subtitle.trim()!==autore){
        y+=2;y=testo(p.subtitle,M.pw/2,y,{size:14,style:'italic',align:'center',lh:8,w:M.utileW-24});
      }
      y+=8;y=testo(autore,M.pw/2,y,{size:15,style:'bold',align:'center',lh:8});
      y+=2;testo(arts.length+(arts.length===1?' opera':' opere'),M.pw/2,y,{size:10,align:'center',color:[110,110,110]});
    }
    // ---- INTRODUZIONE ----
    if(C.intro&&p.intro&&p.intro.trim()){
      nuovaPagina();
      let y=M.mt;
      y=testo('Introduzione',M.ml,y,{size:16,style:'bold',color:rgb,lh:9});
      y=linea(y+1)+5;
      testo(p.intro,M.ml,y,{size:11,lh:6});
    }
    // ---- INDICE ----
    if(C.indice&&arts.length>1){
      nuovaPagina();
      let y=M.mt;
      y=testo('Indice delle opere',M.ml,y,{size:16,style:'bold',color:rgb,lh:9});
      y=linea(y+1)+6;
      pdf.setFont(fontName,'normal');pdf.setFontSize(10);pdf.setTextColor(40,40,40);
      for(let i=0;i<arts.length;i++){
        if(y>M.ph-M.mb){pdf.addPage();y=M.mt;}
        const a=arts[i];
        pdf.setTextColor(rgb[0],rgb[1],rgb[2]);pdf.setFont(fontName,'bold');
        pdf.text(String(i+1),M.ml,y);
        pdf.setTextColor(40,40,40);pdf.setFont(fontName,'normal');
        const t=(a.title||'Senza titolo')+(a.year?'  ('+a.year+')':'');
        pdf.text(pdf.splitTextToSize(t,M.utileW-14)[0],M.ml+10,y);
        y+=6;
      }
    }
    // ---- OPERE (una per pagina, disegno diretto) ----
    for(let i=0;i<arts.length;i++){
      const a=arts[i];
      if(i>0&&i%10===0){await new Promise(r=>setTimeout(r,60));diagLog('PDF','catalogo: '+i+'/'+arts.length+' opere');}
      nuovaPagina();
      let y=M.mt;
      // intestazione
      if(C.intestazione){
        pdf.setFont(fontName,'bold');pdf.setFontSize(9);pdf.setTextColor(rgb[0],rgb[1],rgb[2]);
        pdf.text(('Opera '+(i+1)+' di '+arts.length).toUpperCase(),M.ml,y);
        pdf.setTextColor(140,140,140);pdf.setFont(fontName,'normal');
        pdf.text(pdf.splitTextToSize(p.title||'',M.utileW*0.5)[0],M.pw-M.mr,y,{align:'right'});
        y+=3;y=linea(y)+6;
      }
      // immagine
      if(a.image){
        try{
          const rid=await pdfImgRidotta(a.image,qLato,qJpeg);
          if(rid&&rid.w&&rid.h){
            const maxH=(C.imgMax||70)/100*M.utileH*0.62;
            const maxW=M.utileW;
            let w=maxW, h=w*rid.h/rid.w;
            if(h>maxH){h=maxH;w=h*rid.w/rid.h;}
            const x=C.imgPos==='sinistra'?M.ml:(C.imgPos==='destra'?M.pw-M.mr-w:(M.pw-w)/2);
            pdf.addImage(rid.data,'JPEG',x,y,w,h,undefined,'FAST');
            y+=h+8;
          }
        }catch(eImg){diagLog('PDF-IMG',eImg&&eImg.message?eImg.message:String(eImg));}
      }
      // titolo
      y=testo(a.title||'Senza titolo',M.pw/2,y,{size:15,style:'italic',align:'center',lh:8,w:M.utileW-10});
      if(a.year){y=testo(String(a.year),M.pw/2,y,{size:10,align:'center',color:[120,120,120],lh:7});}
      y+=3;
      // scheda dati
      const dati=[];
      if(F.includes('year')&&a.year)dati.push(['Anno',a.year]);
      if(F.includes('code')&&a.code)dati.push(['Codice',a.code]);
      if(F.includes('technique')&&a.technique)dati.push(['Tecnica',a.technique+(a.support?' su '+a.support:'')]);
      if(F.includes('dimensions')&&a.dimensions)dati.push(['Dimensioni',a.dimensions]);
      if(F.includes('frame')&&a.frame)dati.push(['Cornice',a.frame]);
      if(F.includes('status')&&a.status)dati.push(['Stato',a.status]);
      if(F.includes('price')&&a.price)dati.push(['Prezzo',euro(a.price)]);
      if(dati.length){
        for(const [lab,val] of dati){
          if(y>M.ph-M.mb){pdf.addPage();y=M.mt;}
          pdf.setFont(fontName,'bold');pdf.setFontSize(10);pdf.setTextColor(rgb[0],rgb[1],rgb[2]);
          pdf.text(lab,M.ml,y);
          pdf.setFont(fontName,'normal');pdf.setTextColor(40,40,40);
          const vx=M.ml+M.utileW*0.34;
          const righe=pdf.splitTextToSize(String(val),M.utileW*0.62);
          pdf.text(righe,vx,y);
          y+=Math.max(5.5,righe.length*5);
        }
      }
      // descrizione
      if(F.includes('description')&&a.description){
        y+=3;y=linea(y)+4;
        y=testo(a.description,M.ml,y,{size:10.5,lh:5.6});
      }
    }
    // ---- COLOPHON ----
    if(C.colophon){
      nuovaPagina();
      let y=M.ph*0.35;
      pdf.setDrawColor(rgb[0],rgb[1],rgb[2]);pdf.setLineWidth(0.6);pdf.line(M.pw/2-14,y,M.pw/2+14,y);
      y+=10;
      y=testo(autore,M.pw/2,y,{size:15,style:'bold',align:'center',lh:8});
      if(db.settings.bio){y+=2;y=testo(db.settings.bio,M.pw/2,y,{size:10,align:'center',lh:5.5,w:M.utileW*0.8,color:[70,70,70]});}
      y+=4;testo((db.settings.email||'')+(db.settings.phone?'  \u00b7  '+db.settings.phone:''),M.pw/2,y,{size:10,align:'center',color:[100,100,100]});
      testo('Catalogo generato con MAIR GO! \u00b7 '+new Date().toLocaleDateString('it-IT'),M.pw/2,M.ph-M.mb,{size:8,align:'center',color:[160,160,160]});
    }
    // ---- NUMERI DI PAGINA ----
    if(C.numeri){
      const tot=pdf.internal.getNumberOfPages();
      const da=C.copertina?2:1;
      for(let n=da;n<=tot;n++){pdf.setPage(n);pdfPiePagina(pdf,n,tot,p.title||'',C);}
    }
  }catch(e){
    diagLog('PDF-CATALOGO-ERRORE',e&&e.message?e.message:String(e));
    throw e;
  }
  return pdf;
}

// genera il PDF di un certificato (pagina singola, centrata)
async function pdfCertificatoImpaginato(c){
  const C=pdfCfg();
  const {jsPDF}=window.jspdf;
  const pdf=new jsPDF({orientation:C.orientamento,unit:'mm',format:C.formato});
  const M=pdfMisure(pdf,C);
  const st=pdfStage(C);
  try{
    st.innerHTML='<div style="padding:6px">'+certDocHtml(c)+'</div>';
    await pdfBloccoInPagina(pdf,st,{C,maxH:M.utileH});
  } finally { st.remove(); }
  return pdf;
}

/* ===== PANNELLO CONFIGURAZIONE PDF ===== */
function pdfSettingsModal(){
  const C=pdfCfg();
  const sel=(nome,lista,val)=>'<select name="'+nome+'">'+lista.map(([v,l])=>'<option value="'+v+'"'+(String(val)===String(v)?' selected':'')+'>'+l+'</option>').join('')+'</select>';
  const chk=(nome,label,val)=>'<label class="chkline"><input type="checkbox" name="'+nome+'"'+(val?' checked':'')+'> '+label+'</label>';
  openModal('Impaginazione PDF','<div class="formgrid">'
    +'<div class="field"><label>Formato pagina</label>'+sel('formato',PDF_FORMATI,C.formato)+'</div>'
    +'<div class="field"><label>Orientamento</label>'+sel('orientamento',[['p','Verticale'],['l','Orizzontale']],C.orientamento)+'</div>'
    +'<div class="field"><label>Margine alto (mm)</label><input name="mTop" type="number" min="5" max="60" value="'+C.mTop+'"></div>'
    +'<div class="field"><label>Margine basso (mm)</label><input name="mBottom" type="number" min="5" max="60" value="'+C.mBottom+'"></div>'
    +'<div class="field"><label>Margine sinistro (mm)</label><input name="mLeft" type="number" min="5" max="60" value="'+C.mLeft+'"></div>'
    +'<div class="field"><label>Margine destro (mm)</label><input name="mRight" type="number" min="5" max="60" value="'+C.mRight+'"></div>'
    +'<div class="field"><label>Carattere</label>'+sel('font',PDF_FONTS,C.font)+'</div>'
    +'<div class="field"><label>Colore di titoli e dettagli grafici</label><input name="colore" type="color" value="'+C.colore+'"><p class="meta">È il colore usato nei PDF per titoli, linee, intestazioni e piccoli elementi decorativi. Non modifica le fotografie delle opere.</p></div>'
    +'<div class="field"><label>Corpo del testo</label><input name="corpo" type="number" min="7" max="18" value="'+C.corpo+'"></div>'
    +'<div class="field"><label>Dimensione titoli</label><input name="titolo" type="number" min="14" max="48" value="'+C.titolo+'"></div>'
    +'<div class="field"><label>Altezza max immagine (%)</label><input name="imgMax" type="number" min="20" max="100" value="'+C.imgMax+'"></div>'
    +'<div class="field"><label>Posizione immagine</label>'+sel('imgPos',[['centro','Centrata'],['left','A sinistra'],['right','A destra']],C.imgPos)+'</div>'
    +'<div class="field full"><label>Sezioni del documento</label><div class="chkgrid">'
      +chk('copertina','Copertina',C.copertina)
      +chk('intro','Introduzione',C.intro)
      +chk('indice','Indice opere',C.indice)
      +chk('colophon','Pagina finale',C.colophon)
      +chk('numeri','Numeri di pagina',C.numeri)
      +chk('intestazione','Intestazione opera',C.intestazione)
      +chk('riempi','Riempi la pagina',C.riempi)
    +'</div></div>'
    +'<p class="meta full">Le impostazioni valgono per tutti i cataloghi e certificati generati.</p>'
  +'</div>',fd=>{
    db.settings.pdf={
      formato:fd.get('formato'),orientamento:fd.get('orientamento'),
      mTop:+fd.get('mTop'),mBottom:+fd.get('mBottom'),mLeft:+fd.get('mLeft'),mRight:+fd.get('mRight'),
      font:fd.get('font'),colore:fd.get('colore'),corpo:+fd.get('corpo'),titolo:+fd.get('titolo'),
      imgMax:+fd.get('imgMax'),imgPos:fd.get('imgPos'),
      copertina:!!fd.get('copertina'),intro:!!fd.get('intro'),indice:!!fd.get('indice'),
      colophon:!!fd.get('colophon'),numeri:!!fd.get('numeri'),intestazione:!!fd.get('intestazione'),
      riempi:!!fd.get('riempi')
    };
    save();modal.close();toast('Impaginazione salvata');
  });
}

/* ===== SALVATAGGIO FILE COMPATIBILE ANDROID ===== */
async function salvaFileBlob(nome,blob,mime){
  const CART='MAIR GO';
  try{
    const Cap=window.Capacitor;
    const FS=Cap&&Cap.Plugins&&Cap.Plugins.Filesystem;
    if(FS){
      const b64=await new Promise((ris,rif)=>{const r=new FileReader();r.onload=()=>ris(String(r.result).split(',')[1]);r.onerror=rif;r.readAsDataURL(blob);});
      const tentativi=[
        {dir:'DOCUMENTS',path:CART+'/'+nome,dove:'Documenti/'+CART},
        {dir:'EXTERNAL',path:CART+'/'+nome,dove:'Memoria/'+CART},
        {dir:'DATA',path:CART+'/'+nome,dove:'cartella app'}
      ];
      let res=null,dove='';
      for(const t of tentativi){
        try{res=await FS.writeFile({path:t.path,data:b64,directory:t.dir,recursive:true});dove=t.dove;break;}
        catch(e){diagLog('FILEBLOB-DIR','fallita '+t.dir+': '+(e&&e.message?e.message:e));}
      }
      if(res){
        diagLog('FILEBLOB','salvato in '+dove+': '+nome);
        await condividiOSalva(res.uri,nome,dove);
        return true;
      }
    }
  }catch(e){diagLog('FILEBLOB-ERRORE',e&&e.message?e.message:String(e));}
  try{const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=nome;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);return true;}
  catch(e){diagLog('FILEBLOB-DL',e&&e.message?e.message:String(e));alert('Impossibile salvare il file.');return false;}
}

async function salvaFile(nome,contenuto,mime,condividi){
  const CART='MAIR GO';
  try{
    const Cap=window.Capacitor;
    const FS=Cap&&Cap.Plugins&&Cap.Plugins.Filesystem;
    if(FS){
      const b64=btoa(unescape(encodeURIComponent(contenuto)));
      // salvo SEMPRE in Documenti/MAIR GO (cartella visibile nel telefono)
      const tentativi=[
        {dir:'DOCUMENTS',path:CART+'/'+nome,dove:'Documenti/'+CART},
        {dir:'EXTERNAL',path:CART+'/'+nome,dove:'Memoria/'+CART},
        {dir:'DATA',path:CART+'/'+nome,dove:'cartella app'}
      ];
      let res=null,dove='';
      for(const t of tentativi){
        try{res=await FS.writeFile({path:t.path,data:b64,directory:t.dir,recursive:true});dove=t.dove;break;}
        catch(e){diagLog('FILE-DIR','fallita '+t.dir+': '+(e&&e.message?e.message:e));}
      }
      if(res){
        diagLog('FILE','salvato in '+dove+': '+nome);
        await condividiOSalva(res.uri,nome,dove);
        return true;
      }
    }
  }catch(e){diagLog('FILE-ERRORE',e&&e.message?e.message:String(e));}
  try{download(new Blob([contenuto],{type:mime||'text/plain'}),nome);return true;}
  catch(e){diagLog('FILE-DL',e&&e.message?e.message:String(e));alert('Impossibile salvare il file.');return false;}
}
// messaggio unico: dice DOVE ha salvato e offre la condivisione come scelta
async function condividiOSalva(uri,nome,dove){
  const Cap=window.Capacitor;
  const Sh=Cap&&Cap.Plugins&&Cap.Plugins.Share;
  const msg='File salvato in:\n\n\ud83d\udcc1 '+dove+'\n\ud83d\udcc4 '+nome+'\n\nVuoi anche inviarlo o copiarlo altrove (Drive, email\u2026)?';
  if(Sh&&uri&&confirm(msg)){
    try{await Sh.share({title:nome,text:nome,url:uri,dialogTitle:'Invia o copia '+nome});}
    catch(e){diagLog('SHARE',e&&e.message?e.message:String(e));}
  }
}
function backupFileName(){
  const d=new Date(),pad=n=>String(n).padStart(2,'0');
  return `Backup_MAIR_GO_${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}.backup`;
}
function checksumString(str){
  // checksum semplice ma affidabile (FNV-1a 32bit) per verificare l'integrita'
  let h=0x811c9dc5;
  for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=(h*0x01000193)>>>0;}
  return ('0000000'+h.toString(16)).slice(-8);
}
function contaSezioni(d){
  const c={};['artworks','library','links','pros','galleries','collections','exhibitions','clients','sales','agenda','workspaces','pdfProjects','certificates'].forEach(k=>{c[k]=Array.isArray(d[k])?d[k].length:0;});
  return c;
}
function backupPayload(){
  const dati=clone(db);
  const dataStr=JSON.stringify(dati);
  const conteggi=contaSezioni(dati);
  const totale=Object.values(conteggi).reduce((a,b)=>a+b,0);
  return JSON.stringify({
    format:'MAIR_GO_BACKUP',
    version:12,
    createdAt:new Date().toISOString(),
    app:'MAIR GO!',
    counts:conteggi,
    totalItems:totale,
    checksum:checksumString(dataStr),
    data:dati
  });
}
// verifica che un backup sia integro e leggibile PRIMA di usarlo
function verificaBackup(testo){
  const esito={ok:false,motivo:'',counts:null,totale:0};
  let obj;
  try{obj=JSON.parse(testo);}catch(e){esito.motivo='Il file non \u00e8 un backup valido (JSON illeggibile).';return esito;}
  const dati=obj&&obj.data?obj.data:obj; // compatibile coi vecchi backup senza involucro
  if(!backupLooksLikeDatabase(dati)){esito.motivo='Il file non contiene un archivio MAIR GO! riconoscibile.';return esito;}
  // controllo checksum se presente
  if(obj&&obj.checksum){
    const calc=checksumString(JSON.stringify(dati));
    if(calc!==obj.checksum){esito.motivo='Il backup risulta danneggiato (controllo integrit\u00e0 fallito).';esito.corrotto=true;return esito;}
  }
  esito.counts=contaSezioni(dati);
  esito.totale=Object.values(esito.counts).reduce((a,b)=>a+b,0);
  esito.ok=true;esito.dati=dati;
  return esito;
}
function backupLooksLikeDatabase(x){
  if(!x||typeof x!=='object'||Array.isArray(x))return false;
  const keys=['artworks','library','links','pros','galleries','collections','exhibitions','clients','sales','agenda','workspaces','pdfProjects','certificates','settings'];
  return keys.some(k=>Array.isArray(x[k]))||!!x.settings;
}
function backupNormalizeLegacyData(x){
  if(!x||typeof x!=='object'||Array.isArray(x))return x;
  const aliases={
    opere:'artworks',biblioteca:'library',collegamenti:'links',professionisti:'pros',curatori:'pros',critici:'pros',
    gallerie:'galleries',collezioni:'collections',mostre:'exhibitions',clienti:'clients',vendite:'sales',
    appuntamenti:'agenda',spazi:'workspaces',documenti:'pdfProjects',cataloghi:'pdfProjects',certificati:'certificates',impostazioni:'settings'
  };
  const out={...x};
  for(const [oldKey,newKey] of Object.entries(aliases)){
    if(out[newKey]===undefined&&out[oldKey]!==undefined)out[newKey]=out[oldKey];
  }
  return out;
}
function backupExtractData(obj){
  if(typeof obj==='string'){
    const t=obj.replace(/^\uFEFF/,'').trim();
    if(!t)throw new Error('Il file è vuoto.');
    obj=JSON.parse(t);
  }
  if(!obj||typeof obj!=='object')throw new Error('Il file non contiene dati validi.');

  const candidates=[];
  const add=v=>{if(v&&typeof v==='object')candidates.push(v)};
  add(obj.data); add(obj.dati); add(obj.backup); add(obj.database); add(obj.state); add(obj.db); add(obj.archivio); add(obj.content);
  if(obj.payload&&typeof obj.payload==='object'){add(obj.payload.data);add(obj.payload.dati);add(obj.payload)}
  add(obj);

  for(let candidate of candidates){
    if(typeof candidate==='string'){
      try{candidate=JSON.parse(candidate)}catch{continue}
    }
    candidate=backupNormalizeLegacyData(candidate);
    if(backupLooksLikeDatabase(candidate))return candidate;
  }
  throw new Error('Questo file non è riconosciuto come backup di MAIR GO!.');
}
function backupTextFromBase64(data){
  const raw=String(data||'').includes(',')?String(data).split(',').pop():String(data||'');
  const bin=atob(raw),bytes=new Uint8Array(bin.length);
  for(let n=0;n<bin.length;n++)bytes[n]=bin.charCodeAt(n);
  return new TextDecoder('utf-8').decode(bytes);
}

const BACKUP_PART_MAX_CHARS=12*1024*1024;
function backupStamp(){const d=new Date(),pad=n=>String(n).padStart(2,'0');return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`}
function backupProgressOpen(title){openModal(title,`<div class="backup-progress"><p id="backupProgressText">Preparazione…</p><progress id="backupProgressBar" max="100" value="0" style="width:100%"></progress><p class="meta">Non chiudere MAIR GO durante l’operazione.</p></div>`,()=>{});const f=document.querySelector('#modal form');if(f){const b=f.querySelector('button[type=submit]');if(b)b.style.display='none'}}
function backupProgress(pct,text){const b=document.querySelector('#backupProgressBar'),t=document.querySelector('#backupProgressText');if(b)b.value=Math.max(0,Math.min(100,pct));if(t)t.textContent=text;diagLog('BACKUP-MULTIPARTE',text)}
function backupStripOriginals(value){
  if(Array.isArray(value))return value.map(backupStripOriginals);
  if(!value||typeof value!=='object')return value;
  const out={};
  for(const [k,v] of Object.entries(value)){
    if(k==='image'||k==='photo'||k==='poster'||k==='signatureImg'||k==='full'||k==='originalImage')continue;
    out[k]=backupStripOriginals(v);
  }
  return out;
}
async function backupWritePart(folder,fileName,text){
  const Cap=window.Capacitor,FS=Cap&&Cap.Plugins&&Cap.Plugins.Filesystem;
  if(FS){
    const bytes=new TextEncoder().encode(text);let bin='';const step=0x8000;
    for(let i=0;i<bytes.length;i+=step)bin+=String.fromCharCode(...bytes.subarray(i,i+step));
    const b64=btoa(bin);
    await FS.writeFile({path:`${folder}/${fileName}`,data:b64,directory:'DOCUMENTS',recursive:true});
    let uri='';
    try{const got=await FS.getUri({path:`${folder}/${fileName}`,directory:'DOCUMENTS'});uri=got&&got.uri||'';}catch{}
    return {native:true,path:`Documenti/${folder}/${fileName}`,uri,name:fileName};
  }
  download(new Blob([text],{type:'application/json'}),fileName);
  await new Promise(r=>setTimeout(r,180));
  return {native:false,path:fileName};
}
function backupAllSections(){return ['artworks','library','links','pros','galleries','collections','exhibitions','clients','sales','agenda','workspaces','pdfProjects','certificates']}
async function backupExportFolder(folder,writtenFiles){
  const Cap=window.Capacitor,Native=Cap&&Cap.Plugins&&Cap.Plugins.MairBackup;
  if(!Native||typeof Native.saveBackupFolder!=='function')return {available:false};
  const files=(writtenFiles||[]).filter(x=>x&&x.uri).map(x=>({name:x.name,uri:x.uri}));
  if(!files.length)return {available:false};
  const r=await Native.saveBackupFolder({folderName:folder,files});
  return {available:true,cancelled:!!(r&&r.cancelled),folderUri:r&&r.folderUri||''};
}
async function creaBackupRapido(){
  backupProgressOpen('Backup rapido');
  try{
    backupProgress(10,'Preparazione dati e miniature…');
    const data={};
    for(const k of backupAllSections())data[k]=backupStripOriginals(db[k]||[]);
    data.settings=backupStripOriginals(db.settings||{});
    const payload={format:'MAIR_GO_BACKUP_QUICK',version:16,createdAt:new Date().toISOString(),note:'Dati e miniature; immagini originali escluse',counts:contaSezioni(data),data};
    backupProgress(55,'Creazione file rapido…');
    const text=JSON.stringify(payload);
    const folder=`MAIR_GO_Backup_Rapido_${backupStamp()}`;
    const written=[await backupWritePart(folder,'backup_rapido.mair',text)];
    backupProgress(78,'Scegli la cartella in cui rendere visibile il backup…');
    const exported=await backupExportFolder(folder,written);
    backupProgress(100,'Backup rapido completato in Documenti/'+folder);
    db.settings.lastBackup=new Date().toISOString();save();
    setTimeout(()=>{try{modal.close()}catch{};alert(exported.available?(exported.cancelled?'Backup creato, ma esportazione annullata. Il file resta nell’area privata dell’app. Ripeti il backup e scegli una cartella visibile.':'Backup rapido salvato nella cartella che hai scelto.\n\nNome cartella: '+folder+'\n\nNon contiene le immagini originali.'):'Backup rapido creato nell’area privata dell’app. Per renderlo visibile serve aggiornare anche il plugin Android incluso nel pacchetto.')},400);
    return true;
  }catch(e){diagLog('BACKUP-RAPIDO-ERRORE',e.message||String(e));try{modal.close()}catch{};alert('Backup rapido non riuscito: '+(e.message||e));return false}
}
async function creaBackupMultiparte(){
  const folder=`MAIR_GO_Backup_Completo_${backupStamp()}`;
  backupProgressOpen('Backup completo multiparte');
  const files=[];let partNo=0,totalRecords=backupAllSections().reduce((n,k)=>n+(Array.isArray(db[k])?db[k].length:0),0),done=0;
  try{
    const writeRecords=async(section,records)=>{
      let chunk=[];let chars=0;
      const flush=async()=>{
        if(!chunk.length)return;
        partNo++;const name=`parte_${String(partNo).padStart(4,'0')}_${section}.mairpart`;
        const body={format:'MAIR_GO_BACKUP_PART',version:16,section,part:partNo,records:chunk};
        const text=JSON.stringify(body);
        const written=await backupWritePart(folder,name,text);
        files.push({name,section,records:chunk.length,checksum:checksumString(text),chars:text.length,uri:written.uri||''});
        chunk=[];chars=0;
      };
      for(const rec of records){
        const row=JSON.stringify(rec);
        if(chunk.length&&chars+row.length>BACKUP_PART_MAX_CHARS)await flush();
        chunk.push(rec);chars+=row.length+1;done++;
        backupProgress(Math.round((done/Math.max(1,totalRecords))*92),`${section}: ${done}/${totalRecords} elementi · parte ${partNo+1}`);
        if(done%5===0)await new Promise(r=>setTimeout(r,0));
      }
      await flush();
    };
    for(const k of backupAllSections())await writeRecords(k,Array.isArray(db[k])?db[k]:[]);
    await writeRecords('settings',[db.settings||{}]);
    const manifest={format:'MAIR_GO_BACKUP_MULTIPART',version:16,createdAt:new Date().toISOString(),app:'MAIR GO!',targetArtworks:1000,partMaxChars:BACKUP_PART_MAX_CHARS,counts:contaSezioni(db),files:files.map(({uri,...f})=>f)};
    const manifestText=JSON.stringify(manifest,null,2);
    const manifestWritten=await backupWritePart(folder,'manifest.mairindex',manifestText);
    backupProgress(95,'Scegli una cartella visibile del telefono, Drive o memoria esterna…');
    const exported=await backupExportFolder(folder,[...files.map(f=>({name:f.name,uri:f.uri})),manifestWritten]);
    backupProgress(100,`Completato: ${files.length} parti + manifest`);
    db.settings.lastBackup=new Date().toISOString();save();
    setTimeout(()=>{try{modal.close()}catch{};alert(exported.available?(exported.cancelled?`Backup creato, ma non esportato.\n\nÈ rimasto nell’area privata dell’app e può non comparire in Documenti. Ripeti il backup e completa la scelta della cartella.`:`Backup completo salvato nella cartella scelta.\n\nNome cartella: ${folder}\nFile: ${files.length} parti + manifest.mairindex\n\nConserva l’intera cartella.`):`Backup creato nell’area privata dell’app.\n\nPer scegliere una cartella visibile devi aggiornare anche MairBackupPlugin.java e ricompilare l’APK.`)},500);
    return true;
  }catch(e){diagLog('BACKUP-MULTIPARTE-ERRORE',e.message||String(e));try{modal.close()}catch{};alert('Backup multiparte non riuscito: '+(e.message||e));return false}
}
function backupReadFilesInput(){return new Promise((resolve,reject)=>{const i=document.createElement('input');i.type='file';i.multiple=true;i.accept='.mairindex,.mairpart,application/json,application/octet-stream,*/*';i.onchange=()=>i.files&&i.files.length?resolve([...i.files]):reject(new Error('Nessun file selezionato'));i.click()})}
function backupNativePlugin(){const Cap=window.Capacitor;return Cap&&Cap.Plugins&&Cap.Plugins.MairBackup}
async function backupOpenMultipartSource(){
  const Native=backupNativePlugin();
  if(Native&&typeof Native.openBackupFolder==='function'&&typeof Native.readBackupPart==='function'){
    const chosen=await Native.openBackupFolder();
    if(chosen&&chosen.cancelled)throw new Error('Selezione della cartella annullata.');
    const names=Array.isArray(chosen&&chosen.files)?chosen.files:[];
    if(!names.length)throw new Error('La cartella scelta è vuota. Apri la cartella MAIR_GO_Backup_Completo_… che contiene manifest.mairindex e le parti .mairpart.');
    return {
      names,
      readText:async name=>{const r=await Native.readBackupPart({folderUri:chosen.folderUri,name});return String(r&&r.text||'')},
      native:true
    };
  }
  const files=await backupReadFilesInput(),map=new Map(files.map(f=>[f.name,f]));
  return {names:[...map.keys()],readText:async name=>{const f=map.get(name);if(!f)throw new Error('File non trovato: '+name);return await f.text()},native:false};
}
async function ripristinaBackupMultiparte(){
  try{
    const source=await backupOpenMultipartSource();
    const manifestName=source.names.find(n=>{const x=String(n).toLowerCase().trim();return x.endsWith('.mairindex')||x.includes('.mairindex.')||x==='manifest.json'||(x.startsWith('manifest')&&x.endsWith('.json'))});
    if(!manifestName)throw new Error('Manifest non riconosciuto nella cartella scelta. Sono accettati manifest.mairindex, manifest.mairindex.json e manifest.json.');
    const manifestText=await source.readText(manifestName);
    const manifest=JSON.parse(manifestText);
    if(manifest.format!=='MAIR_GO_BACKUP_MULTIPART')throw new Error('Il file .mairindex non è un manifest MAIR GO valido.');
    const namesLower=new Map(source.names.map(n=>[String(n).toLowerCase(),n]));
    const missing=(manifest.files||[]).filter(x=>!namesLower.has(String(x.name).toLowerCase()));
    if(missing.length)throw new Error(`Mancano ${missing.length} parti del backup. Prima parte mancante: ${missing[0].name}. Conserva e seleziona l’intera cartella.`);
    if(!confirm(`Ripristinare ${manifest.files.length} parti?\n\nI dati attuali saranno sostituiti.`))return false;
    backupProgressOpen('Ripristino multiparte');
    const fresh={};for(const k of backupAllSections())fresh[k]=[];
    for(let n=0;n<manifest.files.length;n++){
      const info=manifest.files[n],realName=namesLower.get(String(info.name).toLowerCase());
      backupProgress(Math.round((n/Math.max(1,manifest.files.length))*100),`Lettura parte ${n+1}/${manifest.files.length}: ${info.name}`);
      const text=await source.readText(realName);
      if(checksumString(text)!==info.checksum)throw new Error('Parte danneggiata o incompleta: '+info.name);
      const part=JSON.parse(text);
      if(part.section==='settings')fresh.settings=(part.records&&part.records[0])||{};
      else{if(!fresh[part.section])fresh[part.section]=[];fresh[part.section].push(...(part.records||[]));}
      backupProgress(Math.round(((n+1)/manifest.files.length)*100),`Caricata parte ${n+1}/${manifest.files.length}`);
      await new Promise(r=>setTimeout(r,0));
    }
    db=merge(clone(defaults),{...fresh,settings:fresh.settings||{}});await writePersistentState(clone(db));save();
    setTimeout(()=>{try{modal.close()}catch{};alert('Ripristino multiparte completato.');render()},400);
    return true;
  }catch(e){diagLog('RIPRISTINO-MULTIPARTE-ERRORE',e.message||String(e));try{modal.close()}catch{};alert('Ripristino multiparte non riuscito: '+(e.message||e));return false}
}
function backupChoiceModal(){openModal('Backup MAIR GO',`<div class="grid"><article class="card"><div class="cardbody"><h3>⚡ Backup rapido</h3><p>Dati e miniature. Più leggero, ma non contiene gli originali.</p><button type="button" class="btn" id="doQuickBackup">Crea backup rapido</button></div></article><article class="card"><div class="cardbody"><h3>🧩 Backup completo multiparte</h3><p>Include tutte le immagini originali. Progettato per 1000 opere senza creare un unico file enorme.</p><button type="button" class="btn primary" id="doFullBackup">Crea backup completo</button></div></article></div>`,()=>{});setTimeout(()=>{const q=document.querySelector('#doQuickBackup'),f=document.querySelector('#doFullBackup');if(q)q.onclick=()=>{modal.close();creaBackupRapido()};if(f)f.onclick=()=>{modal.close();creaBackupMultiparte()};const sb=document.querySelector('#modal button[type=submit]');if(sb)sb.style.display='none'},0)}

async function creaBackupProfessionale(){
  const nome=backupFileName(),contenuto=backupPayload();
  // VERIFICA PRIMA DEL SALVATAGGIO (Versione 12): il backup deve essere rileggibile e integro
  const pre=verificaBackup(contenuto);
  if(!pre.ok){
    alert('Backup non creato: la verifica preventiva \u00e8 fallita.\n\n'+pre.motivo+'\n\nI tuoi dati non sono stati toccati.');
    diagLog('BACKUP-VERIFICA-FALLITA',pre.motivo);
    return false;
  }
  diagLog('BACKUP','verifica preventiva OK, '+pre.totale+' elementi');
  try{
    const Cap=window.Capacitor;
    const FS=Cap&&Cap.Plugins&&Cap.Plugins.Filesystem;
    const Native=Cap&&Cap.Plugins&&Cap.Plugins.MairBackup;

    if(FS&&Native&&typeof Native.saveBackup==='function'){
      const b64=btoa(unescape(encodeURIComponent(contenuto)));
      let scritto=false;
      try{
        const res=await FS.writeFile({path:nome,data:b64,directory:'CACHE',recursive:true});
        scritto=true;
        if(!res||!res.uri)throw new Error('File temporaneo non creato.');
        const scelta=await Native.saveBackup({sourceUri:res.uri,fileName:nome});
        if(scelta&&scelta.cancelled){toast('Backup annullato');return false;}
        db.settings.lastBackup=new Date().toISOString();save();return true;
      }finally{
        if(scritto)try{await FS.deleteFile({path:nome,directory:'CACHE'});}catch(e){diagLog('BACKUP-CLEAN',e&&e.message?e.message:String(e));}
      }
    }

    if(window.showSaveFilePicker){
      const h=await window.showSaveFilePicker({suggestedName:nome,types:[{description:'Backup MAIR GO!',accept:{'application/json':['.backup','.mair','.json']}}]});
      const w=await h.createWritable();await w.write(new Blob([contenuto],{type:'application/json'}));await w.close();
      db.settings.lastBackup=new Date().toISOString();save();return true;
    }
    download(new Blob([contenuto],{type:'application/json'}),nome);
    db.settings.lastBackup=new Date().toISOString();save();return true;
  }catch(e){
    const msg=String(e&&e.message||e||'');
    if(e&&e.name==='AbortError'||/cancel|annull|dismiss|closed/i.test(msg)){toast('Backup annullato');return false;}
    diagLog('BACKUP-ERRORE',msg);alert('Impossibile creare il backup: '+msg);return false;
  }
}
async function backupReadWithMairPlugin(){
  const Cap=window.Capacitor;
  const Native=Cap&&Cap.Plugins&&Cap.Plugins.MairBackup;
  const FS=Cap&&Cap.Plugins&&Cap.Plugins.Filesystem;
  if(!Native||typeof Native.openBackup!=='function'||!FS)return null;
  const result=await Native.openBackup();
  if(!result||result.cancelled)return '';
  if(!result.cacheName)throw new Error('Il selettore non ha restituito il file scelto.');
  try{
    const r=await FS.readFile({path:result.cacheName,directory:'CACHE'});
    return backupTextFromBase64(r.data);
  }finally{
    try{await FS.deleteFile({path:result.cacheName,directory:'CACHE'});}catch(e){diagLog('BACKUP-CLEAN',e&&e.message?e.message:String(e));}
  }
}
async function backupReadWithNativePicker(){
  const Cap=window.Capacitor;
  const FP=Cap&&Cap.Plugins&&(Cap.Plugins.FilePicker||Cap.Plugins.FileChooser);
  if(!FP||typeof FP.pickFiles!=='function')return null;
  const result=await FP.pickFiles({types:['application/json','application/octet-stream','text/plain','*/*'],multiple:false,readData:true});
  const f=result&&result.files&&result.files[0];
  if(!f)return '';
  if(f.data)return backupTextFromBase64(f.data);
  const FS=Cap.Plugins&&Cap.Plugins.Filesystem;
  if(FS&&f.path){const r=await FS.readFile({path:f.path});return backupTextFromBase64(r.data);}
  throw new Error('Il selettore non ha restituito il contenuto del backup.');
}
function backupReadWithInput(){
  return new Promise((resolve,reject)=>{
    const i=document.createElement('input');i.type='file';
    i.accept='.backup,.mair,.json,application/json,application/octet-stream,text/plain,*/*';
    i.style.position='fixed';i.style.left='-9999px';
    let done=false;
    const close=v=>{if(done)return;done=true;i.remove();resolve(v);};
    i.onchange=async()=>{const f=i.files&&i.files[0];if(!f){close('');return;}try{close(await f.text());}catch(e){i.remove();reject(e);}};
    i.oncancel=()=>close('');document.body.appendChild(i);i.click();
    window.addEventListener('focus',()=>setTimeout(()=>{if(!i.files?.length)close('');},700),{once:true});
  });
}
async function ripristinaBackupProfessionale(){
  try{
    let testo=null;
    try{testo=await backupReadWithMairPlugin();}
    catch(e){
      const msg=String(e&&e.message||e||'');
      if(/cancel|annull|dismiss|closed/i.test(msg)){toast('Ripristino annullato');return;}
      diagLog('BACKUP-MAIR-PICKER',msg);testo=null;
    }
    if(testo===null){
      try{testo=await backupReadWithNativePicker();}
      catch(e){
        const msg=String(e&&e.message||e||'');
        if(/cancel|annull|dismiss|closed/i.test(msg)){toast('Ripristino annullato');return;}
        diagLog('BACKUP-PICKER',msg);testo=null;
      }
    }
    if(testo===null)testo=await backupReadWithInput();
    if(!testo){toast('Ripristino annullato');return;}

    testo=String(testo).replace(/^\uFEFF/,'').trim();
    // VERIFICA INTEGRITA' prima di toccare i dati (Versione 12)
    const check=verificaBackup(testo);
    if(!check.ok){
      alert('Impossibile ripristinare.\n\n'+check.motivo+(check.corrotto?'\n\nIl file potrebbe essersi danneggiato durante il salvataggio o il trasferimento.':''));
      return;
    }
    const dati=backupNormalizeLegacyData(check.dati);
    const c=check.counts;
    const riepilogo='Backup verificato e integro.\n\n'
      +'Opere: '+c.artworks+'\nDocumenti: '+c.library+'\nCertificati: '+c.certificates
      +'\nMostre: '+c.exhibitions+'\nClienti: '+c.clients+'\nVendite: '+c.sales
      +'\nGallerie: '+c.galleries+'\nCuratori: '+c.pros+'\nLink: '+c.links
      +'\n\nTotale elementi: '+check.totale
      +'\n\nProcedo con il ripristino?\nUna copia di sicurezza dei dati attuali verr\u00e0 conservata.';
    if(!confirm(riepilogo))return;
    // COPIA DI SICUREZZA del database attuale, prima di sovrascrivere (ripristino sicuro)
    try{
      const primaDati=clone(db);
      window.__backupPrecedente=primaDati;
      try{localStorage.setItem('mairgo_predare_restore',JSON.stringify({at:new Date().toISOString(),data:primaDati}));}catch(e){}
      diagLog('BACKUP','copia di sicurezza pre-ripristino creata');
    }catch(e){diagLog('BACKUP-SAFECOPY',e&&e.message?e.message:String(e));}
    db=merge(clone(defaults),dati);
    await writePersistentState(clone(db));save();render();
    // offro l'annullamento del ripristino
    setTimeout(()=>{
      if(confirm('Ripristino completato con successo.\n\nVuoi mantenere i dati ripristinati?\n\nScegli \u201cAnnulla\u201d per tornare ai dati che avevi PRIMA del ripristino.')){
        try{localStorage.removeItem('mairgo_predare_restore');}catch(e){}
        toast('Dati ripristinati mantenuti');
      }else{
        try{
          const prec=window.__backupPrecedente;
          if(prec){db=merge(clone(defaults),prec);writePersistentState(clone(db));save();render();toast('Ripristino annullato: dati precedenti recuperati');}
        }catch(e){alert('Impossibile annullare il ripristino.');}
      }
    },400);
  }catch(e){
    alert('Backup non valido o non leggibile.\n\n'+(e&&e.message?e.message:''));
    diagLog('BACKUP-IMPORT',e&&e.message?e.message:String(e));
  }
}


function docViewerOpen(title,inner,extraCss,plainText){
  try{
    const old=document.getElementById('docviewer');if(old)old.remove();
    const oldc=document.getElementById('docviewer-css');if(oldc)oldc.remove();
    const css=document.createElement('style');css.id='docviewer-css';
    css.textContent='#docviewer{position:fixed;top:0;left:0;right:0;bottom:0;z-index:99999;background:#eee;display:flex;flex-direction:column}'
      +'#docviewer .dv-bar{display:grid;grid-template-columns:auto repeat(5,minmax(110px,1fr));gap:8px;padding:10px;background:#fff;border-bottom:1px solid #ccc;align-items:center}'
      +'#docviewer .dv-bar button{font:600 .9rem system-ui;padding:10px 12px;border:1px solid #bbb;border-radius:8px;background:#fff;color:#111;white-space:nowrap}'
      +'#docviewer .dv-bar button.pri{background:#8a6a1f;color:#fff;border-color:#8a6a1f}'
      +'#docviewer .dv-scroll{flex:1;overflow-y:auto;padding:12px}'
      +'#docviewer .dv-paper{background:#fff;color:#111;max-width:900px;margin:0 auto;padding:22px;font-family:Georgia,serif;line-height:1.6}'
      +'#docviewer .dv-paper img{max-width:100%;height:auto}'
      +'#docviewer .dv-paper table{width:100%;border-collapse:collapse;margin:14px 0}'
      +'#docviewer .dv-paper td{padding:9px 12px;border-bottom:1px solid #ddd}'
      +'#docviewer .dv-paper .art{display:flex;gap:18px;margin:22px 0;flex-wrap:wrap}'
      +'#docviewer .dv-paper .art img{max-width:240px;border:1px solid #ccc}'
      +'#docviewer .dv-paper .art>div{flex:1 1 220px}'
      +'@media(max-width:760px){#docviewer .dv-bar{grid-template-columns:repeat(3,minmax(0,1fr))}#docviewer .dv-bar button{padding:10px 6px;font-size:.82rem}#docviewer .dv-bar button:first-child{grid-column:1/-1}}'+'@media(max-width:390px){#docviewer .dv-bar{grid-template-columns:repeat(2,minmax(0,1fr))}}'+'@media print{#app,header,nav,.topbar,#toast{display:none!important}'
      +'#docviewer{position:static!important;background:#fff!important}'
      +'#docviewer .dv-bar{display:none!important}'
      +'#docviewer .dv-scroll{overflow:visible!important;padding:0!important}'
      +'#docviewer .dv-paper{max-width:none!important;padding:0!important}}'
      +(extraCss||'');
    document.head.appendChild(css);

    const host=document.createElement('div');host.id='docviewer';
    const bar=document.createElement('div');bar.className='dv-bar';
    const mk=(txt,pri)=>{const b=document.createElement('button');b.textContent=txt;if(pri)b.className='pri';bar.appendChild(b);return b;};
    const bClose=mk('\u2190 Chiudi');
    const bPrint=mk('\ud83d\udcc4 Salva PDF',true);
    const bShare=mk('\ud83d\udce4 Condividi PDF');
    const bCfg=mk('\u2699\ufe0f Impagina');
    const bText=mk('\u270d\ufe0f Testo');
    const bCopy=mk('\ud83d\udccb Copia');
    host.appendChild(bar);

    const scroll=document.createElement('div');scroll.className='dv-scroll';
    const paper=document.createElement('div');paper.className='dv-paper';
    paper.innerHTML=inner||'<p>Documento vuoto.</p>';
    scroll.appendChild(paper);host.appendChild(scroll);
    document.body.appendChild(host);

    const closeIt=()=>{host.remove();css.remove()};
    bClose.onclick=closeIt;
    const generaPDF=async(condividi)=>{
      const btn=condividi?bShare:bPrint;
      const originale=btn.textContent;
      btn.textContent='\u23f3 Attendere...';bPrint.disabled=true;bShare.disabled=true;
      try{
        if(typeof html2canvas!=='function'||!window.jspdf){throw new Error('Librerie PDF non caricate');}
        const {jsPDF}=window.jspdf;
        let pdf;
        const ctx=window.__PDFCTX__||{};
        try{
          if(ctx.tipo==='catalogo'&&ctx.dato){
            const nOp=(ctx.dato.artworkIds||[]).length;
            if(nOp>120){
              const scelta=await scegliModalitaCatalogo(nOp);
              if(!scelta){btn.textContent=originale;bPrint.disabled=false;bShare.disabled=false;return;}
              if(scelta.modo==='diviso'){
                await generaCatalogoDiviso(ctx.dato,scelta,nOp);
                btn.textContent=originale;bPrint.disabled=false;bShare.disabled=false;
                return;
              }
              diagLog('PDF','catalogo '+nOp+' opere, qualità '+scelta.q.nome);
              pdf=await pdfCatalogoImpaginato(ctx.dato,scelta.q);
            }else{
              diagLog('PDF','impaginazione catalogo '+nOp+' opere');
              pdf=await pdfCatalogoImpaginato(ctx.dato);
            }
          }else if(ctx.tipo==='certificato'&&ctx.dato){
            diagLog('PDF','impaginazione certificato');
            pdf=await pdfCertificatoImpaginato(ctx.dato);
          }
        }catch(errImp){
          diagLog('PDF-IMPAG-ERRORE',errImp&&errImp.message?errImp.message:String(errImp));
          pdf=null;
        }
        if(!pdf){
          // generico: cattura semplice con margini
          diagLog('PDF','impaginazione generica');
          pdf=new jsPDF({orientation:'p',unit:'mm',format:'a4'});
          const M=pdfMisure(pdf);
          const canvas=await html2canvas(paper,{scale:2,backgroundColor:'#ffffff',useCORS:true,logging:false});
          const img=canvas.toDataURL('image/jpeg',0.92);
          const iw=M.utileW, ih=canvas.height*iw/canvas.width;
          let resto=ih, pos=M.mt;
          pdf.addImage(img,'JPEG',M.ml,pos,iw,ih);
          resto-=M.utileH;
          while(resto>0){pos-=M.utileH;pdf.addPage();pdf.addImage(img,'JPEG',M.ml,pos,iw,ih);resto-=M.utileH;}
        }
        const nome=safeName(title)+'.pdf';
        try{
          const blob=pdf.output('blob');
          await salvaFileBlob(nome,blob,'application/pdf');
          toast('PDF creato');
        }catch(ePdf){
          diagLog('PDF-SAVE',ePdf&&ePdf.message?ePdf.message:String(ePdf));
          alert('Impossibile salvare il PDF: '+(ePdf&&ePdf.message?ePdf.message:ePdf));
        }
      }catch(e){
        diagLog('PDF-ERRORE',e&&e.message?e.message:String(e));
        alert('Impossibile creare il PDF: '+(e&&e.message?e.message:e));
      }finally{
        btn.textContent=originale;bPrint.disabled=false;bShare.disabled=false;
      }
    };
    bPrint.onclick=()=>generaPDF(false);
    bShare.onclick=()=>generaPDF(true);
    bCfg.onclick=()=>pdfSettingsModal();
    bText.onclick=()=>{const testo=plainText||paper.innerText;closeIt();requestAnimationFrame(()=>textEditorOpen(title,testo));};
    bCopy.onclick=async()=>{
      try{await navigator.clipboard.writeText(plainText||paper.innerText);toast('Testo copiato')}
      catch(e){toast('Copia non riuscita')}
    };
  }catch(err){
    alert('Errore apertura documento: '+(err&&err.message?err.message:err));
  }
}

let previewId=null;function pdfPreviewView(){const p=db.pdfProjects.find(x=>x.id===previewId);if(!p)return empty('📄','Progetto non trovato.');const arts=(p.artworkIds||[]).map(id=>db.artworks.find(a=>a.id===id)).filter(Boolean),F=p.fields||[];return `<div class="toolbar no-print"><button class="btn" data-action="backPdf">← PDF Studio</button><button class="btn primary" data-action="printPdf">📄 Apri documento</button><button class="btn" data-action="sharePdf">✍️ Copia testo</button></div><article class="pdf-page" data-theme="${esc(p.theme)}"><header style="border-bottom:3px solid var(--accent);padding-bottom:28px;margin-bottom:35px"><small>MAIR GO! · ${esc(p.type)}</small><h1>${esc(p.title)}</h1><h2>${esc(p.subtitle)}</h2><p>${esc(p.intro||'')}</p></header>${arts.map(a=>`<section class="pdf-art"><div>${a.image?`<img src="${a.image}" alt="${esc(a.title)}">`:''}</div><div><h2>${esc(a.title)}</h2>${F.includes('year')?`<p><strong>Anno:</strong> ${esc(a.year)}</p>`:''}${F.includes('code')?`<p><strong>Codice:</strong> ${esc(a.code)}</p>`:''}${F.includes('technique')?`<p><strong>Tecnica:</strong> ${esc(a.technique)}${a.support?' su '+esc(a.support):''}</p>`:''}${F.includes('dimensions')?`<p><strong>Dimensioni:</strong> ${esc(a.dimensions)}</p>`:''}${F.includes('frame')?`<p><strong>Cornice:</strong> ${esc(a.frame)}</p>`:''}${F.includes('status')?`<p><strong>Stato:</strong> ${esc(a.status)}</p>`:''}${F.includes('price')&&a.price?`<p><strong>Prezzo:</strong> ${euro(a.price)}</p>`:''}${F.includes('description')?`<p>${esc(a.description)}</p>`:''}</div></section>`).join('')}<footer style="border-top:1px solid #bbb;padding-top:20px;margin-top:40px"><strong>${esc(db.settings.artist)}</strong><br>${esc(db.settings.email)} ${esc(db.settings.phone)}</footer></article>`}

/* ===== MAIR GO! 13-14 — PORTABILITÀ E CONTROLLO ARCHIVIO ===== */
const MAIR_EXPORT_SECTIONS=[
  ['artworks','Opere'],['clients','Clienti'],['exhibitions','Mostre'],['pros','Curatori e critici'],
  ['galleries','Gallerie'],['sales','Vendite'],['certificates','Certificati']
];
const MAIR_SHEET_FIELDS={
  artworks:['id','code','title','year','technique','support','dimensions','frame','status','price','collection','location','description','notes','created','updated'],
  clients:['id','name','company','email','phone','address','city','country','notes','created','updated'],
  exhibitions:['id','title','venue','city','country','startDate','endDate','curator','status','notes','created','updated'],
  pros:['id','name','role','company','email','phone','website','city','country','notes','created','updated'],
  galleries:['id','name','contact','email','phone','website','address','city','country','notes','created','updated'],
  sales:['id','artworkId','clientId','date','amount','total','paid','paymentMethod','status','notes','created','updated'],
  certificates:['id','certNumber','title','artworkId','clientId','date','place','template','theme','body','notes','created','updated']
};
function mairXml(v){return String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;')}
function mairFileSafe(v){return String(v||'file').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9._-]+/gi,'_').replace(/^_+|_+$/g,'').slice(0,90)||'file'}
function mairCol(n){let s='';for(n++;n;n=Math.floor((n-1)/26))s=String.fromCharCode(65+(n-1)%26)+s;return s}
function mairCell(ref,value,style=0){if(value===null||value===undefined)value='';if(typeof value==='number'&&Number.isFinite(value))return `<c r="${ref}" s="${style}"><v>${value}</v></c>`;return `<c r="${ref}" s="${style}" t="inlineStr"><is><t xml:space="preserve">${mairXml(value)}</t></is></c>`}
function mairDataUrlParts(data){const m=String(data||'').match(/^data:([^;,]+)(?:;charset=[^;,]+)?;base64,(.+)$/);if(!m)return null;let ext=(m[1].split('/')[1]||'jpg').replace('jpeg','jpg').replace('svg+xml','svg');return {mime:m[1],ext,b64:m[2]}}
function mairRowsFor(section){return (db[section]||[]).map(x=>{const out={};(MAIR_SHEET_FIELDS[section]||Object.keys(x)).forEach(k=>out[k]=Array.isArray(x[k])?x[k].join(' | '):(x[k]&&typeof x[k]==='object'?JSON.stringify(x[k]):x[k]??''));return out})}
async function mairMakeXlsx(){
  if(typeof JSZip==='undefined')throw new Error('Libreria ZIP non disponibile.');
  const zip=new JSZip(),sheetDefs=[],media=[],drawings=[];
  MAIR_EXPORT_SECTIONS.forEach(([key,label],si)=>{
    const rows=mairRowsFor(key),fields=MAIR_SHEET_FIELDS[key]||[],withPhoto=key==='artworks',headers=withPhoto?['Foto',...fields]:fields;
    const xmlRows=[];
    xmlRows.push(`<row r="1" ht="28" customHeight="1">${headers.map((h,i)=>mairCell(mairCol(i)+'1',h,1)).join('')}</row>`);
    rows.forEach((row,ri)=>{const rn=ri+2,cells=[];if(withPhoto)cells.push(mairCell('A'+rn,'',0));fields.forEach((f,fi)=>cells.push(mairCell(mairCol(fi+(withPhoto?1:0))+rn,row[f],0)));xmlRows.push(`<row r="${rn}" ht="82" customHeight="1">${cells.join('')}</row>`)});
    const cols=headers.map((_,i)=>`<col min="${i+1}" max="${i+1}" width="${i===0&&withPhoto?18:(i<4?22:18)}" customWidth="1"/>`).join('');
    let drawingTag='';
    if(withPhoto){
      const anchors=[];let imgNo=0;
      (db.artworks||[]).forEach((a,ri)=>{const p=mairDataUrlParts(a.thumb||a.image);if(!p)return;imgNo++;media.push({name:`image${imgNo}.${p.ext}`,data:p.b64,mime:p.mime});anchors.push(`<xdr:oneCellAnchor><xdr:from><xdr:col>0</xdr:col><xdr:colOff>90000</xdr:colOff><xdr:row>${ri+1}</xdr:row><xdr:rowOff>90000</xdr:rowOff></xdr:from><xdr:ext cx="1047750" cy="1047750"/><xdr:pic><xdr:nvPicPr><xdr:cNvPr id="${imgNo}" name="Opera ${imgNo}"/><xdr:cNvPicPr/></xdr:nvPicPr><xdr:blipFill><a:blip r:embed="rId${imgNo}"/><a:stretch><a:fillRect/></a:stretch></xdr:blipFill><xdr:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="1047750" cy="1047750"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></xdr:spPr></xdr:pic><xdr:clientData/></xdr:oneCellAnchor>`)});
      if(anchors.length){drawings.push({xml:`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><xdr:wsDr xmlns:xdr="http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">${anchors.join('')}</xdr:wsDr>`,rels:media.map((m,i)=>`<Relationship Id="rId${i+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/${m.name}"/>`).join('')});drawingTag='<drawing r:id="rId1"/>';}
    }
    const maxCell=mairCol(headers.length-1)+Math.max(1,rows.length+1);
    const sheet=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><dimension ref="A1:${maxCell}"/><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><cols>${cols}</cols><sheetData>${xmlRows.join('')}</sheetData><autoFilter ref="A1:${mairCol(headers.length-1)}1"/>${drawingTag}</worksheet>`;
    sheetDefs.push({key,label,xml:sheet,hasDrawing:!!drawingTag});
  });
  zip.file('[Content_Types].xml',`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Default Extension="jpg" ContentType="image/jpeg"/><Default Extension="webp" ContentType="image/webp"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${sheetDefs.map((_,i)=>`<Override PartName="/xl/worksheets/sheet${i+1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('')}${drawings.map((_,i)=>`<Override PartName="/xl/drawings/drawing${i+1}.xml" ContentType="application/vnd.openxmlformats-officedocument.drawing+xml"/>`).join('')}</Types>`);
  zip.folder('_rels').file('.rels','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>');
  zip.folder('xl').file('workbook.xml',`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${sheetDefs.map((s,i)=>`<sheet name="${mairXml(s.label.slice(0,31))}" sheetId="${i+1}" r:id="rId${i+1}"/>`).join('')}</sheets></workbook>`);
  zip.folder('xl/_rels').file('workbook.xml.rels',`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheetDefs.map((_,i)=>`<Relationship Id="rId${i+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i+1}.xml"/>`).join('')}<Relationship Id="rId${sheetDefs.length+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`);
  zip.folder('xl').file('styles.xml','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><color rgb="FFFFFFFF"/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF2D2D2D"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFill="1" applyFont="1"/></cellXfs></styleSheet>');
  const ws=zip.folder('xl/worksheets');sheetDefs.forEach((s,i)=>{ws.file(`sheet${i+1}.xml`,s.xml);if(s.hasDrawing)zip.folder('xl/worksheets/_rels').file(`sheet${i+1}.xml.rels`,`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing" Target="../drawings/drawing1.xml"/></Relationships>`)});
  drawings.forEach((d,i)=>{zip.folder('xl/drawings').file(`drawing${i+1}.xml`,d.xml);zip.folder('xl/drawings/_rels').file(`drawing${i+1}.xml.rels`,`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${d.rels}</Relationships>`)});
  media.forEach(m=>zip.folder('xl/media').file(m.name,m.data,{base64:true}));
  return zip.generateAsync({type:'blob',compression:'DEFLATE',compressionOptions:{level:6}});
}
function mairCatalogHtml(){const cards=(db.artworks||[]).map((a,i)=>`<article><div class="img">${a.image?`<img src="${a.image}" alt="${mairXml(a.title)}">`:'<span>Nessuna immagine</span>'}</div><h2>${mairXml(a.title||'Senza titolo')}</h2><p><b>${mairXml(a.code||'')}</b> ${mairXml(a.year||'')}</p><p>${mairXml([a.technique,a.support,a.dimensions].filter(Boolean).join(' · '))}</p><p>${mairXml(a.status||'')}</p></article>`).join('');return `<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Catalogo MAIR GO!</title><style>body{font-family:Arial,sans-serif;margin:0;background:#f4f2ee;color:#222}header{padding:32px;text-align:center;background:#222;color:#fff}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;padding:24px}article{background:white;border-radius:14px;padding:14px;box-shadow:0 4px 18px #0002}.img{height:240px;display:grid;place-items:center;background:#eee;border-radius:10px;overflow:hidden}.img img{width:100%;height:100%;object-fit:contain}h2{font-size:20px;margin-bottom:6px}p{margin:6px 0;color:#555}</style></head><body><header><h1>Archivio opere</h1><p>${mairXml(db.settings.artist||'MAIR GO!')} · ${new Date().toLocaleDateString('it-IT')}</p></header><main class="grid">${cards}</main></body></html>`}
async function mairExportExcel(){try{toast('Preparazione Excel…');const blob=await mairMakeXlsx();const ok=await salvaFileBlob(`Archivio_MAIR_GO_${new Date().toISOString().slice(0,10)}.xlsx`,blob,'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');if(ok)toast('Excel creato');}catch(e){diagLog('EXPORT-EXCEL',e&&e.message?e.message:String(e));alert('Esportazione Excel non riuscita: '+(e&&e.message?e.message:e));}}
async function mairExportHtml(){try{const blob=new Blob([mairCatalogHtml()],{type:'text/html;charset=utf-8'});const ok=await salvaFileBlob(`Catalogo_MAIR_GO_${new Date().toISOString().slice(0,10)}.html`,blob,'text/html');if(ok)toast('Catalogo HTML creato');}catch(e){diagLog('EXPORT-HTML',e&&e.message?e.message:String(e));alert('Esportazione HTML non riuscita: '+(e&&e.message?e.message:e));}}
async function mairExportComplete(){if(typeof JSZip==='undefined')return alert('Libreria ZIP non disponibile.');try{toast('Creazione archivio completo…');const zip=new JSZip();zip.file('Archivio_MAIR_GO.xlsx',await mairMakeXlsx());zip.file('Catalogo_MAIR_GO.html',mairCatalogHtml());zip.file('LEGGIMI.txt','Archivio completo MAIR GO!\nContiene Excel, catalogo HTML e immagini originali.\nCreato il '+new Date().toLocaleString('it-IT'));
  (db.artworks||[]).forEach((a,i)=>{const p=mairDataUrlParts(a.image);if(p)zip.folder('Immagini').file(`${String(i+1).padStart(4,'0')}_${mairFileSafe(a.code||a.title||'opera')}.${p.ext}`,p.b64,{base64:true})});
  const blob=await zip.generateAsync({type:'blob',compression:'DEFLATE',compressionOptions:{level:6}},m=>{if(Math.round(m.percent)%20===0)toast('Archivio '+Math.round(m.percent)+'%')});const ok=await salvaFileBlob(`Archivio_Completo_MAIR_GO_${new Date().toISOString().slice(0,10)}.zip`,blob,'application/zip');if(ok)toast('Archivio completo creato')}catch(e){diagLog('EXPORT-ZIP',e&&e.message?e.message:String(e));alert('Archivio completo non riuscito: '+(e&&e.message?e.message:e));}}
function mairDuplicateKey(x,fields){return fields.map(k=>String(x[k]||'').trim().toLowerCase()).join('|')}
function mairIntegrity(){const issues=[];const add=(level,type,msg,id='')=>issues.push({level,type,msg,id});
  const seenIds=new Map();MAIR_EXPORT_SECTIONS.forEach(([k,label])=>(db[k]||[]).forEach(x=>{if(!x.id)add('errore',label,'Record senza ID');else if(seenIds.has(x.id))add('errore','ID duplicato',`${label}: ID già usato in ${seenIds.get(x.id)}`,x.id);else seenIds.set(x.id,label)}));
  (db.artworks||[]).forEach(a=>{if(!a.image)add('avviso','Opera senza immagine',a.title||a.code||'Senza titolo',a.id);if(!a.title)add('avviso','Opera incompleta','Titolo mancante',a.id)});
  const checks=[['sales','Vendita','artworkId','artworks'],['sales','Vendita','clientId','clients'],['certificates','Certificato','artworkId','artworks'],['certificates','Certificato','clientId','clients']];checks.forEach(([s,l,f,target])=>(db[s]||[]).forEach(x=>{if(x[f]&&!(db[target]||[]).some(y=>y.id===x[f]))add('errore','Collegamento mancante',`${l}: ${f} non trovato`,x.id)}));
  [['artworks',['title','year','dimensions']],['clients',['name','email']],['pros',['name','email']],['galleries',['name','email']]].forEach(([s,fs])=>{const map=new Map();(db[s]||[]).forEach(x=>{const k=mairDuplicateKey(x,fs);if(k.replace(/\|/g,'')){if(map.has(k))add('avviso','Possibile duplicato',`${s}: ${x.title||x.name||x.id}`,x.id);else map.set(k,x.id)}})});return issues}
function mairDbSize(){
  try{
    const txt=JSON.stringify(db);
    const bytes=new Blob([txt]).size;
    const mb=bytes/1048576;
    let img=0;(db.artworks||[]).forEach(a=>{if(a.image)img+=a.image.length;});
    return {bytes,leggibile:mb>=1?mb.toFixed(1)+' MB':(bytes/1024).toFixed(0)+' KB',immaginiMB:(img/1048576).toFixed(1)};
  }catch(e){return {bytes:0,leggibile:'?',immaginiMB:'?'};}
}

function mairStats(){const values=(db.sales||[]).map(s=>Number(s.total||s.amount||0)).filter(Number.isFinite);return {opere:(db.artworks||[]).length,conImmagine:(db.artworks||[]).filter(a=>a.image).length,disponibili:(db.artworks||[]).filter(a=>String(a.status).toLowerCase()==='disponibile').length,vendute:(db.artworks||[]).filter(a=>String(a.status).toLowerCase()==='venduto').length,clienti:(db.clients||[]).length,mostre:(db.exhibitions||[]).length,professionisti:(db.pros||[]).length,gallerie:(db.galleries||[]).length,certificati:(db.certificates||[]).length,vendite:(db.sales||[]).length,valoreVendite:values.reduce((a,b)=>a+b,0)}}
function archiveToolsView(){const st=mairStats(),issues=mairIntegrity(),dbSize=mairDbSize();return `${section('Esportazione dati/Excel')}<p class="section-intro">Esporta, importa e controlla il tuo archivio senza appesantire l’uso quotidiano.</p><div class="card" style="margin:14px 0"><div class="cardbody"><h3>💾 Dimensione archivio</h3><p class="meta">L'archivio occupa <strong>${dbSize.leggibile}</strong> in totale, di cui circa <strong>${dbSize.immaginiMB} MB</strong> di immagini. I dati stanno tutti sul dispositivo.</p></div></div><div class="grid"><article class="card"><div class="cardbody"><h3>📊 Esportazione Excel</h3><p>Sette fogli separati. Nel foglio Opere sono incorporate le miniature.</p><button class="btn primary" data-action="exportExcel13">Esporta Excel</button></div></article><article class="card"><div class="cardbody"><h3>📦 Archivio completo</h3><p>ZIP con Excel, immagini originali, catalogo HTML e istruzioni.</p><button class="btn primary" data-action="exportComplete13">Esporta tutto</button></div></article><article class="card"><div class="cardbody"><h3>🌐 Catalogo HTML</h3><p>Catalogo autonomo, consultabile offline con qualunque browser.</p><button class="btn" data-action="exportHtml13">Esporta HTML</button></div></article><article class="card"><div class="cardbody"><h3>↩️ Importazione Excel</h3><p>Importa i fogli esportati da MAIR GO. Prima viene mostrata un’anteprima.</p><button class="btn" data-action="importExcel14">Importa Excel</button></div></article></div><h2>Controllo integrità</h2><div class="row"><button class="btn primary" data-action="refreshIntegrity14">Ricontrolla</button></div><div class="integrity-list">${issues.length?issues.map(i=>`<div class="integrity-item ${i.level}"><strong>${esc(i.type)}</strong><span>${esc(i.msg)}</span></div>`).join(''):'<div class="integrity-ok">✓ Nessun problema rilevato</div>'}</div><h2>Statistiche</h2><div class="stats">${stat('Opere',st.opere,'🎨')}${stat('Opere con immagine',st.conImmagine,'🖼️')}${stat('Opere disponibili',st.disponibili,'✓')}${stat('Opere vendute',st.vendute,'●')}${stat('Clienti',st.clienti,'👥')}${stat('Vendite',st.vendite,'💶')}${stat('Valore vendite',euro(st.valoreVendite),'€')}${stat('Mostre',st.mostre,'🏛️')}${stat('Gallerie',st.gallerie,'🏛️')}${stat('Curatori',st.professionisti,'👤')}${stat('Certificati',st.certificati,'✦')}${stat('Problemi',issues.length,'🛡️')}</div>`}
function mairText(n){return (n?.textContent||'').trim()}
async function mairParseXlsx(file){if(typeof JSZip==='undefined')throw new Error('Libreria ZIP non disponibile.');const zip=await JSZip.loadAsync(await file.arrayBuffer()),wbXml=await zip.file('xl/workbook.xml')?.async('text');if(!wbXml)throw new Error('File Excel non riconosciuto.');const parser=new DOMParser(),wb=parser.parseFromString(wbXml,'application/xml'),names=[...wb.querySelectorAll('sheet')].map(x=>x.getAttribute('name'));let shared=[];const sf=zip.file('xl/sharedStrings.xml');if(sf){const sx=parser.parseFromString(await sf.async('text'),'application/xml');shared=[...sx.querySelectorAll('si')].map(si=>[...si.querySelectorAll('t')].map(mairText).join(''))}
 const out={};for(let i=0;i<names.length;i++){const f=zip.file(`xl/worksheets/sheet${i+1}.xml`);if(!f)continue;const sx=parser.parseFromString(await f.async('text'),'application/xml'),rows=[...sx.querySelectorAll('sheetData row')].map(r=>[...r.querySelectorAll('c')].map(c=>{const type=c.getAttribute('t'),v=mairText(c.querySelector('v')),t=[...c.querySelectorAll('is t')].map(mairText).join('');return type==='s'?shared[Number(v)]||'':type==='inlineStr'?t:v}));if(!rows.length)continue;const headers=rows[0].map(x=>String(x).trim()),records=rows.slice(1).map(vals=>Object.fromEntries(headers.map((h,j)=>[h,vals[j]??'']))).filter(x=>Object.values(x).some(Boolean));const match=MAIR_EXPORT_SECTIONS.find(([,l])=>l.toLowerCase()===names[i].toLowerCase());if(match){if(match[0]==='artworks')records.forEach(r=>delete r.Foto);out[match[0]]=records}}
 return out}
async function mairImportExcel(){const input=document.createElement('input');input.type='file';input.accept='.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';input.onchange=async()=>{const f=input.files?.[0];if(!f)return;try{const parsed=await mairParseXlsx(f),summary=Object.entries(parsed).map(([k,v])=>`${k}: ${v.length}`).join('\n');if(!summary)throw new Error('Nessun foglio MAIR GO riconosciuto.');if(!confirm(`Dati trovati:\n${summary}\n\nI record con lo stesso ID saranno aggiornati; gli altri aggiunti. Continuare?`))return;Object.entries(parsed).forEach(([k,rows])=>{const old=db[k]||[],map=new Map(old.map(x=>[x.id,x]));rows.forEach(r=>{r.id=r.id||uid();map.set(r.id,{...(map.get(r.id)||{}),...r})});db[k]=[...map.values()]});save();render();toast('Importazione completata')}catch(e){alert('Importazione non riuscita: '+(e.message||e))}};input.click()}
views.archiveTools=()=>archiveToolsView();titles.archiveTools='Esportazione dati/Excel';

const actions={exportExcel13:()=>mairExportExcel(),exportComplete13:()=>mairExportComplete(),exportHtml13:()=>mairExportHtml(),importExcel14:()=>mairImportExcel(),refreshIntegrity14:()=>{const issues=mairIntegrity();render();alert(T('Esecuzione terminata')+'.\n\n'+(issues.length?(T('Problemi rilevati')+': '+issues.length):T('Nessun problema rilevato. Archivio integro.')));},openDiag:()=>diagOpen(),rimuoviEsempio:()=>cancellaDatiEsempio(),caricaEsempio:()=>{if(haDatiEsempio()){alert('I dati d\u2019esempio sono gi\u00e0 presenti.');return;}caricaDatiEsempio();render();toast('Dati d\u2019esempio caricati');},rivediTour:()=>{db.settings.tourFatto=false;save();giroGuidato();},dona:()=>donaModal(),timelineAzzera:()=>timelineAzzeraModal(),
 newLink:()=>linkModal(),editLink:id=>linkModal((db.links||[]).find(x=>x.id===id)),deleteLink:id=>del('links',id),
 manageLinkCats:()=>linkCatsModal(),
 printLinks:()=>{window.__PDFCTX__={tipo:'generico'};docViewerOpen('Link utili',linksDocHtml(),'',linksPlain())},
 newPro:()=>proModal(),editPro:id=>proModal((db.pros||[]).find(x=>x.id===id)),deletePro:id=>del('pros',id),
 printPros:()=>{window.__PDFCTX__={tipo:'generico'};docViewerOpen('Curatori e critici',prosDocHtml(),'',prosPlain())},
 newGallery:()=>galleryModal(),editGallery:id=>galleryModal((db.galleries||[]).find(x=>x.id===id)),deleteGallery:id=>del('galleries',id),
 printGalleries:()=>{window.__PDFCTX__={tipo:'generico'};docViewerOpen('Gallerie',galleriesDocHtml(),'',galleriesPlain())},esciApp:()=>esciApp(),chiudiTutto:()=>chiudiOverlay(),newSocialPost:()=>{const a=db.artworks.filter(x=>x.image);if(!a.length){toast('Aggiungi immagini alle opere');return}socialPostModal(a[0])},socialSingolo:()=>{const a=db.artworks.filter(x=>x.image);if(a.length)socialPostModal(a[0])},socialSequenza:()=>socialSequenzaModal(),socialVideo:()=>videoModal(),socialDaOpera:id=>{const a=db.artworks.find(x=>x.id===id);if(a)socialPostModal(a)},pdfSettings:()=>pdfSettingsModal(),customizeHome:()=>homeCustomizeModal(),prepareEmail:()=>{const name=document.querySelector('[name=contactName]')?.value||'',from=document.querySelector('[name=contactEmail]')?.value||'',cat=$('#contactCategory')?.value||'Altro',sub=document.querySelector('[name=contactSubject]')?.value||'Contatto da MAIR GO!',msg=document.querySelector('[name=contactMessage]')?.value||'';const body=`Nome: ${name}\nEmail: ${from}\nCategoria: ${cat}\n\n${msg}`;location.href=`mailto:dandreart.info@gmail.com?subject=${encodeURIComponent('MAIR GO! - '+cat+' - '+sub)}&body=${encodeURIComponent(body)}`},copyContactEmail:async()=>{await navigator.clipboard.writeText('dandreart.info@gmail.com');toast('Indirizzo copiato')},newWorkspace:()=>workspaceModal(),editWorkspace:id=>workspaceModal(db.workspaces.find(x=>x.id===id)),deleteWorkspace:id=>del('workspaces',id),newExhibition:()=>exhibitionModal(),editExhibition:id=>exhibitionModal(db.exhibitions.find(x=>x.id===id)),deleteExhibition:id=>del('exhibitions',id),catalogFromExhibition:id=>catalogFromExhibition(id),newClient:()=>clientModal(),editClient:id=>clientModal(db.clients.find(x=>x.id===id)),deleteClient:id=>del('clients',id),newSale:()=>saleModal(),newSaleForClient:id=>saleModal({clientId:id}),editSale:id=>saleModal(db.sales.find(x=>x.id===id)),deleteSale:id=>del('sales',id),printReceipt:id=>printReceipt(id),newAgenda:()=>agendaModal(),editAgenda:id=>agendaModal(db.agenda.find(x=>x.id===id)),deleteAgenda:id=>del('agenda',id),exportAgendaIcs:()=>exportAgendaIcs(),newArtwork:()=>artworkModal(),bulkImportArtworks:()=>bulkImportArtworksModal(),optimizeArtworkImages:()=>optimizeArtworkImages(),zoomArtwork:(id)=>{const a=db.artworks.find(x=>x.id===id);if(!a||!a.image){toast('Nessuna immagine da mostrare');return;}mostraImmagineIntera(a.image,a.title);},
  editArtwork:id=>artworkModal(db.artworks.find(x=>x.id===id)),deleteArtwork:id=>del('artworks',id),toggleArtworkFav:id=>{const x=db.artworks.find(a=>a.id===id);x.favorite=!x.favorite;save();render()},newLibrary:()=>libraryModal(),editLibrary:id=>libraryModal(db.library.find(x=>x.id===id)),openLibrary:id=>openLibrary(id),deleteLibrary:id=>del('library',id),toggleLibFav:id=>{const x=db.library.find(a=>a.id===id);x.favorite=!x.favorite;save();render()},newPdfProject:()=>pdfProjectModal(),editPdfProject:id=>pdfProjectModal(db.pdfProjects.find(x=>x.id===id)),deletePdfProject:id=>del('pdfProjects',id),openPdfProject:id=>{previewId=id;route='pdfpreview';render()},newCertificate:()=>certificateModal(),editCertificate:id=>certificateModal(db.certificates.find(x=>x.id===id)),deleteCertificate:id=>del('certificates',id),openCertificate:id=>{certPreviewId=id;go('certpreview')},backCert:()=>go('certificates'),printCert:()=>{diagLog('CLICK','printCert premuto');const c=db.certificates.find(x=>x.id===certPreviewId);if(!c)return;const tpl=CERT_TEMPLATES[c.template]||CERT_TEMPLATES.autenticita;window.__PDFCTX__={tipo:'certificato',dato:c};docViewerOpen(c.title||tpl.title,certDocHtml(c),'',certPlain(c))},shareCert:()=>{const c=db.certificates.find(x=>x.id===certPreviewId);if(!c)return;const tpl=CERT_TEMPLATES[c.template]||CERT_TEMPLATES.autenticita;textEditorOpen(c.title||tpl.title,certPlain(c))},backPdf:()=>go('pdfstudio'),printPdf:()=>{diagLog('CLICK','printPdf premuto');const p=db.pdfProjects.find(x=>x.id===previewId);if(!p)return;window.__PDFCTX__={tipo:'catalogo',dato:p};docViewerOpen(p.title||'Catalogo',pdfDocHtml(p),'',pdfPlain(p))},sharePdf:()=>{const p=db.pdfProjects.find(x=>x.id===previewId);if(!p)return;textEditorOpen(p.title||'Catalogo',pdfPlain(p))},saveProfile:()=>{db.settings.artist=$('[name=artist]').value;db.settings.bio=$('[name=bio]').value;db.settings.email=$('[name=email]').value;db.settings.phone=$('[name=phone]').value;save();toast('Profilo salvato')},saveAppearance:()=>{db.settings.theme=$('#themeSetting').value;db.settings.fontSize=$('#fontSetting').value;db.settings.lang=$('#langSetting')?.value||'it';db.settings.animations=$('#animationsSetting').checked;db.settings.splash=$('#splashSetting').checked;save();render();toast('Aspetto salvato')},savePin:async()=>{const enabled=$('#pinEnabled').checked,p=$('#newPin').value,c=$('#confirmPin').value;if(p&&(!/^\d{4,6}$/.test(p)||p!==c))return alert('Inserisci due PIN uguali di 4–6 cifre.');if(p)db.settings.pinHash=await hashPin(p);if(enabled&&!db.settings.pinHash)return alert('Imposta prima un PIN.');db.settings.pinEnabled=enabled;save();toast('Sicurezza salvata')},resetArtworkFilters:()=>{document.querySelectorAll('.filtergrid input,.filtergrid select').forEach(x=>x.value='');bindArtworkFilters();},addListItem:k=>{const v=prompt('Nuova voce');if(v){db.settings.lists[k].push(v);save();render()}},removeListItem:id=>{const[k,i]=id.split(':');db.settings.lists[k].splice(+i,1);save();render()},saveLists:()=>{document.querySelectorAll('[data-list-key]').forEach(x=>db.settings.lists[x.dataset.listKey][+x.dataset.listI]=x.value.trim());save();toast('Liste salvate')},exportBackup:()=>backupChoiceModal(),exportBackupQuick:()=>creaBackupRapido(),exportBackupFull:()=>creaBackupMultiparte(),importBackup:()=>ripristinaBackupProfessionale(),importBackupParts:()=>ripristinaBackupMultiparte()};window.actions=actions;function del(k,id){if(confirm('Eliminare definitivamente?')){db[k]=db[k].filter(x=>x.id!==id);save();render()}}

function testoRicercabile(x){
  const salta=['image','photo','poster','signatureImg','data','file','thumb','id','created','updated'];
  const parti=[];
  const scava=o=>{
    if(o==null)return;
    if(Array.isArray(o)){o.forEach(scava);return;}
    if(typeof o==='object'){
      Object.keys(o).forEach(k=>{
        if(salta.includes(k))return;
        const v=o[k];
        if(typeof v==='string'&&v.length>300)return;
        scava(v);
      });
      return;
    }
    parti.push(String(o));
  };
  scava(x);
  return parti.join(' ').toLowerCase();
}
function bindLinkFilter(){
  const i=$('#linkSearch'),g=$('#linkGrid');if(!i||!g)return;
  const run=()=>{
    const q=i.value.trim().toLowerCase();
    const termini=q.split(/\s+/).filter(Boolean);
    const cats=linkCats();
    let out='';
    cats.forEach(c=>{
      let arr=(db.links||[]).filter(l=>(cats.includes(l.category)?l.category:cats[0])===c);
      if(termini.length)arr=arr.filter(l=>{const t=testoRicercabile(l);return termini.every(w=>t.includes(w));});
      if(!arr.length)return;
      arr.sort((a,b)=>String(a.title||'').localeCompare(String(b.title||'')));
      out+='<section class="link-cat"><div class="row spread"><h3>'+esc(c)+' <span class="badge">'+arr.length+'</span></h3></div><div class="link-list">'
        +arr.map(l=>'<article class="link-row"><a class="link-main" href="'+esc(l.url)+'" target="_blank" rel="noopener"><span class="link-ico">&#128279;</span><span><strong>'+esc(l.title||l.url)+'</strong>'+(l.notes?'<small>'+esc(l.notes)+'</small>':'')+'<small class="link-url">'+esc(l.url)+'</small></span></a>'
        +'<div class="link-act"><button class="btn" data-action="editLink" data-id="'+l.id+'">Modifica</button><button class="btn danger" data-action="deleteLink" data-id="'+l.id+'">&times;</button></div></article>').join('')
        +'</div></section>';
    });
    g.innerHTML=out||empty('&#9906;','Nessun link trovato.');
    document.querySelectorAll('#linkGrid [data-action]').forEach(x=>x.onclick=()=>actions[x.dataset.action]?.(x.dataset.id,x));
  };
  i.oninput=run;
}
function bindProFilter(){
  const i=$('#proSearch'),r=$('#proRole'),g=$('#proGrid');if(!i||!g)return;
  const run=()=>{
    const q=i.value.trim().toLowerCase();
    const termini=q.split(/\s+/).filter(Boolean);
    const ruolo=r?r.value:'';
    let arr=(db.pros||[]);
    if(ruolo)arr=arr.filter(p=>(p.role||'Altro')===ruolo);
    if(termini.length)arr=arr.filter(p=>{const t=testoRicercabile(p);return termini.every(w=>t.includes(w));});
    g.innerHTML=arr.map(proCard).join('')||empty('&#9906;','Nessun contatto trovato.');
    document.querySelectorAll('#proGrid [data-action]').forEach(x=>x.onclick=()=>actions[x.dataset.action]?.(x.dataset.id,x));
  };
  i.oninput=run;if(r)r.onchange=run;
}
function bindSimpleFilter(inputId,gridId,arr,cardFn){
  const i=$('#'+inputId),g=$('#'+gridId);if(!i||!g)return;
  const run=()=>{
    const q=i.value.trim().toLowerCase();
    const termini=q.split(/\s+/).filter(Boolean);
    const res=!termini.length?arr:arr.filter(x=>{const t=testoRicercabile(x);return termini.every(w=>t.includes(w));});
    g.innerHTML=res.map(cardFn).join('')||empty('&#9906;','Nessun risultato per \u201c'+esc(i.value)+'\u201d.');
    document.querySelectorAll('#'+gridId+' [data-action]').forEach(x=>x.onclick=()=>actions[x.dataset.action]?.(x.dataset.id,x));
  };
  i.oninput=run;
}
function bindAgendaFilters(){const q=$('#agendaSearch'),t=$('#agendaType'),g=$('#agendaList');if(!q||!t||!g)return;const run=()=>{const s=q.value.toLowerCase();g.innerHTML=[...db.agenda].filter(x=>(!t.value||x.type===t.value)&&JSON.stringify(x).toLowerCase().includes(s)).sort((a,b)=>new Date(a.date)-new Date(b.date)).map(agendaCard).join('')||empty('⌕','Nessun evento.');document.querySelectorAll('#agendaList [data-action]').forEach(x=>x.onclick=()=>actions[x.dataset.action]?.(x.dataset.id,x))};q.oninput=t.onchange=run}

function renderProgressive(gridId,items,cardFn,perBlocco=24){
  const g=$('#'+gridId);if(!g)return;
  if(!items.length){g.innerHTML=empty('\u2315','Nessun elemento.');return;}
  let mostrati=0;
  const bindActions=()=>{document.querySelectorAll('#'+gridId+' [data-action]').forEach(x=>x.onclick=()=>actions[x.dataset.action]?.(x.dataset.id,x));};
  const blocco=()=>{
    const fine=Math.min(mostrati+perBlocco,items.length);
    const html=items.slice(mostrati,fine).map(cardFn).join('');
    const piu=document.getElementById(gridId+'_more');
    if(piu)piu.remove();
    g.insertAdjacentHTML('beforeend',html);
    mostrati=fine;
    if(mostrati<items.length){
      g.insertAdjacentHTML('afterend','<div id="'+gridId+'_more" class="load-more"><button class="btn" id="'+gridId+'_moreBtn">Carica altre ('+(items.length-mostrati)+')</button></div>');
      const btn=document.getElementById(gridId+'_moreBtn');
      if(btn)btn.onclick=blocco;
      // auto-carica allo scroll vicino
      const sentinel=document.getElementById(gridId+'_more');
      if('IntersectionObserver'in window&&sentinel){
        const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){io.disconnect();blocco();}});});
        io.observe(sentinel);
      }
    }
    bindActions();
  };
  g.innerHTML='';
  blocco();
}
function artworkSearchText(a){return [a.title,a.code,a.year,a.technique,a.support,a.dimensions,a.frame,a.status,a.collection,a.location,a.description,a.notes].filter(Boolean).join(' ').toLowerCase()}
function bindArtworkFilters(){
  const ids=['artSearch','artStatus','artYear','artTechnique','artSupport','artDimension','artFrame','artCollection','artLocation','artFavorite','artMinPrice','artMaxPrice'];
  const E=Object.fromEntries(ids.map(id=>[id,$('#'+id)]));
  const run=()=>{
    const words=(E.artSearch?.value||'').toLowerCase().trim().split(/\s+/).filter(Boolean),min=Number(E.artMinPrice?.value||0),max=Number(E.artMaxPrice?.value||Infinity);
    const arr=db.artworks.filter(a=>(!E.artStatus.value||a.status===E.artStatus.value)&&(!E.artYear.value||a.year===E.artYear.value)&&(!E.artTechnique.value||a.technique===E.artTechnique.value)&&(!E.artSupport.value||a.support===E.artSupport.value)&&(!E.artDimension.value||a.dimensions===E.artDimension.value)&&(!E.artFrame.value||a.frame===E.artFrame.value)&&(!E.artCollection.value||String(a.collection||'').toLowerCase().includes(E.artCollection.value.toLowerCase()))&&(!E.artLocation.value||String(a.location||'').toLowerCase().includes(E.artLocation.value.toLowerCase()))&&(!E.artFavorite.value||a.favorite)&&Number(a.price||0)>=min&&Number(a.price||0)<=max&&words.every(w=>artworkSearchText(a).includes(w)));
    if($('#filterCount'))$('#filterCount').textContent=`${arr.length} opere visualizzate su ${db.artworks.length}`;
    renderProgressive('artGrid',arr,artworkCard,24);
  };
  ids.forEach(id=>{const x=E[id];if(x)x.oninput=x.onchange=run});run();
}
function bindLibraryFilters(){const s=$('#libSearch'),t=$('#libType'),c=$('#libCat');const run=()=>{const q=s.value.toLowerCase();const arr=db.library.filter(d=>(!c.value||d.category===c.value)&&(!t.value||(t.value==='pdf'&&d.mime?.includes('pdf'))||(t.value==='doc'&&(d.mime?.includes('word')||d.mime?.includes('text')))||(t.value==='image'&&d.mime?.startsWith('image'))||(t.value==='fav'&&d.favorite)||(t.value==='linked'&&d.artworkId))&&JSON.stringify({...d,data:''}).toLowerCase().includes(q));$('#libGrid').innerHTML=arr.map(libCard).join('')||empty('⌕','Nessun documento trovato.');bind()};s.oninput=t.onchange=c.onchange=run}
async function hashPin(pin){const data=new TextEncoder().encode('MAIR-GO-'+pin);const digest=await crypto.subtle.digest('SHA-256',data);return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,'0')).join('')}
function showLock(){const lock=$('#lockScreen');lock.classList.remove('hidden');setTimeout(()=>$('#pinInput').focus(),100);$('#unlockBtn').onclick=async()=>{if(await hashPin($('#pinInput').value)===db.settings.pinHash){lock.classList.add('hidden');$('#pinInput').value=''}else{toast('PIN errato');$('#pinInput').select()}};$('#pinInput').onkeydown=e=>{if(e.key==='Enter')$('#unlockBtn').click()};$('#pinHelp').onclick=()=>alert('Per tutelare i dati, il PIN non può essere recuperato. È possibile ripristinare un backup precedente oppure cancellare i dati del sito dal browser.')}
function startup(){const splash=$('#splash');if(db.settings.splash===false)splash.remove();else setTimeout(()=>splash.classList.add('splash-out'),1500);setTimeout(()=>{splash?.remove();if(db.settings.pinEnabled&&db.settings.pinHash)showLock();else primoAvvio()},1900)}
$('#homeBtn').onclick=()=>go('home');$('#exitBtn').onclick=()=>esciApp();$('#themeBtn').onclick=()=>{const i=themeOptions.findIndex(x=>x[0]===db.settings.theme);db.settings.theme=themeOptions[(i+1)%themeOptions.length][0];save();render();toast(themeOptions[(i+1)%themeOptions.length][1])};document.querySelectorAll('.bottomnav button').forEach(b=>b.onclick=()=>go(b.dataset.route));$('#viewerClose').onclick=()=>{try{viewer.querySelector('.viewer-shell')?.classList.remove('reader-open');}catch(e){}viewer.close();};window.addEventListener('hashchange',()=>{route=location.hash.slice(1)||'home';render()});let deferredInstallPrompt=null;function installAvailable(){const standalone=matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;const b=$('#installBtn');if(b)b.classList.toggle('hidden',standalone||!deferredInstallPrompt)}window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstallPrompt=e;installAvailable()});window.addEventListener('appinstalled',()=>{deferredInstallPrompt=null;installAvailable();toast('MAIR GO! installata')});$('#installBtn').onclick=async()=>{if(!deferredInstallPrompt)return;deferredInstallPrompt.prompt();await deferredInstallPrompt.userChoice;deferredInstallPrompt=null;installAvailable()};async function boot(){
  await initPersistence();
  // service worker disattivato: causava il mancato aggiornamento dell'app (cache vecchia)
  if('serviceWorker'in navigator){
    try{const rs=await navigator.serviceWorker.getRegistrations();rs.forEach(r=>r.unregister());}catch(e){}
  }
  render();
  installAvailable();
  startup();
}
window.addEventListener('pagehide',()=>{queuePersistentSave()});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')queuePersistentSave()});
boot();
