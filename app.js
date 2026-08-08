const it = {
  skip:'Vai al contenuto',private:'Area privata',eyebrow:'Il nostro angolo in Liguria',welcome:'Benvenuti',place:'a Trigoso',lead:'Tutto quello che serve per sentirsi a casa, raccolto in un posto solo.',openGuide:'Apri la guida',seeRates:'Vedi le tariffe',directions:'Come arrivare',manual:'Manuale di casa',needHelp:'Serve una mano?',guideIntro:'Le risposte rapide alle domande più comuni. Tocca una scheda per aprire le istruzioni.',wifiSub:'Connessione e router',wifiText:'In caso di problemi di connessione, spostare il router verso la cucina, accanto alla finestra.',todo:'Da completare',entry:'Ingresso',entrySub:'Chiavi e accesso',entryText:'All’interno dell’abitazione si trovano un secondo mazzo di chiavi della casa e il mazzo del garage, composto da tre chiavi e un telecomando:',garageKey1:'una chiave e il telecomando aprono il cancello grande per l’auto;',garageKey2:'una chiave apre il piccolo cancello pedonale;',garageKey3:'una chiave apre la serranda del box auto.',hotWater:'Acqua calda',heater:'Piccolo boiler',hotText:'Il piccolo boiler può fornire al massimo due docce. Distribuire le docce durante la giornata per evitare di restare senza acqua calda.',climate:'Climatizzazione',climateSub:'Fan coil centrale',climateText:'Le camere sono climatizzate da un unico fan coil nel disimpegno. Accenderlo preventivamente nel pomeriggio e lasciare aperte le porte delle camere per ottenere un buon comfort.',waste:'Immondizia',wasteSub:'Raccolta differenziata',wasteText:'La raccolta differenziata è obbligatoria. I bidoni sono in fondo alla strada, scendendo. Usare la chiave triangolare per aprirli.',appliances:'Impianti ed elettrodomestici',appliancesSub:'Interruttori di sicurezza',appliancesText:'Se scaldacqua, fornelli, lavatrice o lavastoviglie non funzionano, controllare gli interruttori I/O presenti in cucina. Per la lavatrice, controllare anche l’interruttore dedicato in bagno.',inductionText:'La potenza dei fornelli a induzione è limitata dalle caratteristiche dell’impianto elettrico. Usando più fornelli contemporaneamente, la loro potenza potrebbe ridursi: è un comportamento normale.',departure:'Partenza',departureSub:'Checklist finale',check1:'Pulire l’appartamento',check2:'Chiudere gas e acqua',check3:'Staccare la corrente dal quadro generale',check4:'Lasciare la porta del frigo aperta',stayContribution:'Contributo soggiorno',simpleRates:'Tariffe semplici',ratesIntro:'Tre formule pensate per la famiglia, gli amici e chi ci è vicino.',withOwners:'Con proprietari presenti',perPersonWeek:'/ persona / settimana',withOwnersText:'Per ospiti che soggiornano insieme ai proprietari.',allAges:'Adulti e bambini inclusi',maxGuests:'Massimo 6 persone',familyFriends:'Famiglia e amici stretti',perWeek:'/ settimana',withoutOwners:'Uso dell’appartamento senza la presenza dei proprietari.',acquaintances:'Conoscenti',noPets:'Animali non ammessi',noPetsText:'Grazie per aiutarci a mantenere la casa adatta a tutti.',confirmation:'Tariffe a uso privato, soggette a conferma dei proprietari.',reminder:'Promemoria',beforeLeaving:'Prima di partire',confirmDates:'Conferma le date',confirmDatesText:'Contatta i proprietari per verificare la disponibilità.',arrangeArrival:'Concorda l’arrivo',arrangeArrivalText:'Definisci orario e modalità di consegna delle chiavi.',enjoy:'Buon soggiorno',enjoyText:'Rispetta la casa e goditi il mare di Trigoso.',comingSoon:'Prossimamente',onlineBooking:'Prenotazioni online',bookingText:'In futuro sarà possibile richiedere le date direttamente da questa pagina.',notAvailable:'Non ancora disponibile',footerText:'Una guida privata per famiglia e amici.',backTop:'Torna su ↑',navHome:'Home',navGuide:'Guida',navRates:'Tariffe',navMap:'Mappa'
};
it.withOwnersText = 'Per gli ospiti che soggiornano con almeno uno dei seguenti proprietari:';
Object.assign(it, {
  temporaryLabel: 'Da tenere presente',
  temporaryTitle: 'Problematiche temporanee',
  temporaryIntro: 'Informazioni provvisorie da conoscere durante il soggiorno.',
  temporaryStatus: 'In attesa di riparazione',
  sinkDoorTitle: 'Anta sotto il lavello',
  sinkDoorText: 'Il cardine superiore dell’anta sotto il lavello si è scardinato. Aprire con attenzione.'
});
Object.assign(it, {
  usefulLabel: 'Nei dintorni',
  usefulTitle: 'Informazioni utili',
  usefulIntro: 'Trasporti e indirizzi consigliati da tenere a portata di mano.',
  transport: 'Trasporti',
  busTimes: 'Orari autobus AMT',
  busArea: 'Sestri Levante e Riva Trigoso',
  restaurants: 'Ristoranti',
  pizzerias: 'Pizzerie',
  aperitifs: 'Pub e aperitivi'
});
Object.assign(it, {
  trains: 'Treni',
  trainTimes: 'Partenze in tempo reale',
  trainStation: 'Stazione di Riva Trigoso · RFI'
});
Object.assign(it, {
  summerService: 'Servizio estivo',
  shuttleTimes: 'Orari navette estive',
  shuttlePeriod: 'Campeggi · Riva Trigoso · Sestri Levante · dall’1 al 23 agosto 2026'
});
it.wasteBags = 'Per la plastica e l’indifferenziata utilizzare il sacchetto fornito.';
Object.assign(it, {
  delivery: 'Consegne a domicilio',
  onlineGroceries: 'Spesa online',
  foodDelivery: 'Cibo a domicilio',
  useJustEat: 'Usare l’app Just Eat'
});
it.shopping = 'Spesa';
Object.assign(it, {
  calendarLabel: 'Disponibilità',
  calendarTitle: 'Calendario prenotazioni',
  calendarIntro: 'Controlla i periodi già prenotati prima di richiedere le tue date.',
  calendarLegend: 'Gli eventi visualizzati corrispondono ai periodi prenotati',
  openCalendar: 'Apri in Google Calendar',
  calendarNote: 'Il calendario è sincronizzato con Google Calendar. Se l’anteprima non è visibile, usa il pulsante qui sopra.'
});
const fr = {};
document.querySelectorAll('[data-i18n]').forEach(el => fr[el.dataset.i18n] = el.textContent);
const dictionaries = {fr,it};
function setLanguage(lang){
  const dict=dictionaries[lang]||fr;
  document.documentElement.lang=lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{if(dict[el.dataset.i18n]) el.textContent=dict[el.dataset.i18n]});
  document.querySelectorAll('[data-lang]').forEach(btn=>{const active=btn.dataset.lang===lang;btn.classList.toggle('active',active);btn.setAttribute('aria-pressed',String(active))});
  document.title=lang==='fr'?'Casa Trigoso — Guide privé':'Casa Trigoso — Guida privata';
  localStorage.setItem('casa-trigoso-language',lang);
}
document.querySelectorAll('[data-lang]').forEach(btn=>btn.addEventListener('click',()=>setLanguage(btn.dataset.lang)));
setLanguage(localStorage.getItem('casa-trigoso-language')||'fr');
document.querySelectorAll('.guide-grid details').forEach(card=>card.addEventListener('toggle',()=>{if(card.open)document.querySelectorAll('.guide-grid details[open]').forEach(other=>{if(other!==card)other.open=false})}));
const links=[...document.querySelectorAll('.mobile-nav a[href^="#"]')];
new IntersectionObserver(entries=>{const seen=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(seen)links.forEach(a=>a.classList.toggle('active',a.hash===`#${seen.target.id}`))},{rootMargin:'-20% 0px -65%',threshold:[0,.2,.6]}).observe(document.querySelector('#home'));
['guide','rates'].forEach(id=>{const el=document.getElementById(id);new IntersectionObserver(entries=>{if(entries[0].isIntersecting)links.forEach(a=>a.classList.toggle('active',a.hash===`#${id}`))},{rootMargin:'-20% 0px -65%',threshold:.1}).observe(el)});
