/** Stable numeric hash — same input always returns same number */
const stableHash = (str) => {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
};

// ── Image pools ────────────────────────────────────────────────────────────────
const POOL = {

  // ── Indian national / political ───────────────────────────────────────────
  national: [
    'https://images.unsplash.com/photo-1532375810709-75b1da3efd3c?w=800&h=450&fit=crop', // India Gate
    'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=450&fit=crop', // Parliament
    'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=450&fit=crop', // Taj Mahal
    'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=450&fit=crop', // Delhi
    'https://images.unsplash.com/photo-1598223421-a4e9b5c7b5f7?w=800&h=450&fit=crop', // Indian crowd
    'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&h=450&fit=crop', // Indian flag
  ],

  // ── World / international generic ─────────────────────────────────────────
  world: [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop', // Earth from space
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=450&fit=crop', // Globe/travel
    'https://images.unsplash.com/photo-1529832397702-7e44b7cf00b1?w=800&h=450&fit=crop', // City skyline
    'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&h=450&fit=crop', // Globe
    'https://images.unsplash.com/photo-1499336315816-097655dcfbda?w=800&h=450&fit=crop', // International flags
    'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=450&fit=crop', // World city
  ],

  // ── Country-specific ──────────────────────────────────────────────────────
  china: [
    'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&h=450&fit=crop', // Great Wall
    'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&h=450&fit=crop', // Shanghai skyline
    'https://images.unsplash.com/photo-1474690870753-1b92efa1f2d8?w=800&h=450&fit=crop', // Chinese architecture
    'https://images.unsplash.com/photo-1555400082-c2264ba85e3f?w=800&h=450&fit=crop', // Beijing
    'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&h=450&fit=crop', // China city
  ],

  usa: [
    'https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=800&h=450&fit=crop', // American flag
    'https://images.unsplash.com/photo-1569974498991-d3c12a504f4d?w=800&h=450&fit=crop', // New York
    'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&h=450&fit=crop', // Washington DC Capitol
    'https://images.unsplash.com/photo-1434394673533-dbf4e0f6b492?w=800&h=450&fit=crop', // USA skyline
    'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&h=450&fit=crop', // White House
  ],

  pakistan: [
    'https://images.unsplash.com/photo-1604328727766-a151d1045ab5?w=800&h=450&fit=crop', // Pakistan
    'https://images.unsplash.com/photo-1526712318848-5f38e2b12d82?w=800&h=450&fit=crop', // South Asian city
    'https://images.unsplash.com/photo-1549887552-cb1071a1a36c?w=800&h=450&fit=crop', // South Asian street
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop', // Mountains (Karakoram)
  ],

  russia: [
    'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=800&h=450&fit=crop', // Moscow Red Square
    'https://images.unsplash.com/photo-1578374173705-969cbe6f2d6b?w=800&h=450&fit=crop', // Russia winter
    'https://images.unsplash.com/photo-1596397249129-c7a8de985f18?w=800&h=450&fit=crop', // Russian architecture
    'https://images.unsplash.com/photo-1520106212299-d99c443e4568?w=800&h=450&fit=crop', // Kremlin
  ],

  ukraine: [
    'https://images.unsplash.com/photo-1647695941498-3e580f3ae4f0?w=800&h=450&fit=crop', // Ukraine flag
    'https://images.unsplash.com/photo-1646463955898-7b79d91dfe6c?w=800&h=450&fit=crop', // Ukraine conflict
    'https://images.unsplash.com/photo-1548516173-3cabfa4607e9?w=800&h=450&fit=crop', // Military/war
    'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=800&h=450&fit=crop', // Conflict scene
  ],

  japan: [
    'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&h=450&fit=crop', // Mount Fuji
    'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&h=450&fit=crop', // Tokyo
    'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=450&fit=crop', // Japan temple
    'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&h=450&fit=crop', // Japan street
  ],

  uk: [
    'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=450&fit=crop', // London Big Ben
    'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800&h=450&fit=crop', // London bridge
    'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=800&h=450&fit=crop', // Westminster
    'https://images.unsplash.com/photo-1520986606214-8b456906c813?w=800&h=450&fit=crop', // UK city
  ],

  europe: [
    'https://images.unsplash.com/photo-1493707553966-283afac8c358?w=800&h=450&fit=crop', // European city
    'https://images.unsplash.com/photo-1471623432079-b009d30b6729?w=800&h=450&fit=crop', // Paris Eiffel
    'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=450&fit=crop', // Berlin
    'https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&h=450&fit=crop', // European parliament
    'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&h=450&fit=crop', // Rome/Italy
  ],

  middleeast: [
    'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=800&h=450&fit=crop', // Middle East
    'https://images.unsplash.com/photo-1548585744-1eb2099da08e?w=800&h=450&fit=crop', // Dubai skyline
    'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800&h=450&fit=crop', // Desert
    'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&h=450&fit=crop', // Jerusalem
    'https://images.unsplash.com/photo-1506719040632-7d586470c936?w=800&h=450&fit=crop', // Middle East city
  ],

  nepal: [
    'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&h=450&fit=crop', // Himalayas Nepal
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=450&fit=crop', // Nepal temple
    'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=800&h=450&fit=crop', // Kathmandu
  ],

  southasia: [
    'https://images.unsplash.com/photo-1567422031971-a5c5f08e5d7d?w=800&h=450&fit=crop', // South Asia
    'https://images.unsplash.com/photo-1549887552-cb1071a1a36c?w=800&h=450&fit=crop', // South Asian city
    'https://images.unsplash.com/photo-1526712318848-5f38e2b12d82?w=800&h=450&fit=crop', // Asian street
    'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=800&h=450&fit=crop', // Asian city
  ],

  // ── Event-specific ────────────────────────────────────────────────────────
  election: [
    'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&h=450&fit=crop', // Ballot box
    'https://images.unsplash.com/photo-1464820453369-31d2c0b651af?w=800&h=450&fit=crop', // Voting
    'https://images.unsplash.com/photo-1567168544646-208fa5d408fb?w=800&h=450&fit=crop', // Election
    'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=450&fit=crop', // Vote
  ],

  parliament: [
    'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=450&fit=crop', // Indian Parliament
    'https://images.unsplash.com/photo-1532375810709-75b1da3efd3c?w=800&h=450&fit=crop', // India Gate
    'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=450&fit=crop', // Government building
  ],

  army: [
    'https://images.unsplash.com/photo-1548516173-3cabfa4607e9?w=800&h=450&fit=crop', // Soldiers
    'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&h=450&fit=crop', // Military
    'https://images.unsplash.com/photo-1569163139394-de4e5f37e5a5?w=800&h=450&fit=crop', // Defence
    'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=800&h=450&fit=crop', // Fighter jet
  ],

  war: [
    'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=800&h=450&fit=crop', // Conflict
    'https://images.unsplash.com/photo-1648737963503-1a26da876aca?w=800&h=450&fit=crop', // War/rubble
    'https://images.unsplash.com/photo-1569163139394-de4e5f37e5a5?w=800&h=450&fit=crop', // Military
    'https://images.unsplash.com/photo-1548516173-3cabfa4607e9?w=800&h=450&fit=crop', // Soldiers
  ],

  disaster: [
    'https://images.unsplash.com/photo-1547483238-f400e65ccd56?w=800&h=450&fit=crop', // Earthquake/ruins
    'https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=800&h=450&fit=crop', // Flood
    'https://images.unsplash.com/photo-1520637102-b57f56c4aa72?w=800&h=450&fit=crop', // Natural disaster
    'https://images.unsplash.com/photo-1475776408506-9a5371e7a068?w=800&h=450&fit=crop', // Storm
    'https://images.unsplash.com/photo-1612178991541-b48cc8e92a4d?w=800&h=450&fit=crop', // Flood waters
  ],

  cricket: [
    'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800&h=450&fit=crop', // Cricket
    'https://images.unsplash.com/photo-1593766788306-28361bc0d739?w=800&h=450&fit=crop', // Cricket bat
    'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=450&fit=crop', // Cricket stadium
    'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=450&fit=crop', // Cricket match
  ],

  sports: [
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=450&fit=crop', // Football
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=450&fit=crop', // Athletics
    'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&h=450&fit=crop', // Stadium
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=450&fit=crop', // Sports general
  ],

  economy: [
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=450&fit=crop', // Stock market
    'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=450&fit=crop', // Finance charts
    'https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800&h=450&fit=crop', // Money
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop', // Business finance
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=450&fit=crop', // Stock graph
  ],

  court: [
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=450&fit=crop', // Gavel
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=450&fit=crop', // Law books
    'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=450&fit=crop', // Scales of justice
  ],

  railway: [
    'https://images.unsplash.com/photo-1474487548417-781cb6d646b3?w=800&h=450&fit=crop', // Train
    'https://images.unsplash.com/photo-1552083375-1447ce886485?w=800&h=450&fit=crop', // Railway track
    'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&h=450&fit=crop', // Metro/train
    'https://images.unsplash.com/photo-1540228232585-3f1d026f22e2?w=800&h=450&fit=crop', // Modern train
  ],

  infrastructure: [
    'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=450&fit=crop', // Bridge construction
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=450&fit=crop', // Construction
    'https://images.unsplash.com/photo-1590486803833-1b5dc97207f2?w=800&h=450&fit=crop', // Highway
    'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=450&fit=crop', // City infra
  ],

  environment: [
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=450&fit=crop', // Forest
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=450&fit=crop', // Climate/nature
    'https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?w=800&h=450&fit=crop', // Pollution/smoke
    'https://images.unsplash.com/photo-1504391912117-0b4a5d396b62?w=800&h=450&fit=crop', // Green earth
  ],

  climate: [
    'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&h=450&fit=crop', // Climate change
    'https://images.unsplash.com/photo-1569163139394-de4e5f37e5a5?w=800&h=450&fit=crop', // Global warming
    'https://images.unsplash.com/photo-1504391912117-0b4a5d396b62?w=800&h=450&fit=crop', // Green earth
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=450&fit=crop', // Nature
    'https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?w=800&h=450&fit=crop', // Pollution
  ],

  agriculture: [
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=450&fit=crop', // Wheat field
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=450&fit=crop', // Farmer
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=450&fit=crop', // Agriculture
    'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=450&fit=crop', // Crops
  ],

  space: [
    'https://images.unsplash.com/photo-1614726365952-510103b1bec8?w=800&h=450&fit=crop', // Rocket launch
    'https://images.unsplash.com/photo-1516849677043-ef67c9557e16?w=800&h=450&fit=crop', // Space/galaxy
    'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=450&fit=crop', // Satellite
    'https://images.unsplash.com/photo-1541873676-a18131494184?w=800&h=450&fit=crop', // Moon mission
    'https://images.unsplash.com/photo-1457364887197-9150188c107b?w=800&h=450&fit=crop', // Mars/planet
  ],

  ai: [
    'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=450&fit=crop', // AI/neural
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=450&fit=crop', // Robot/AI
    'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=450&fit=crop', // Circuit board
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=450&fit=crop', // Digital
  ],

  schemes: [
    'https://images.unsplash.com/photo-1532375810709-75b1da3efd3c?w=800&h=450&fit=crop', // Government
    'https://images.unsplash.com/photo-1559523028-cf82e0ea1e39?w=800&h=450&fit=crop', // Community
    'https://images.unsplash.com/photo-1527525443983-6e60c75fff46?w=800&h=450&fit=crop', // People/social
  ],

  oil: [
    'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&h=450&fit=crop', // Oil refinery
    'https://images.unsplash.com/photo-1545259742-a2b8b4a0c5b5?w=800&h=450&fit=crop', // Oil platform
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=450&fit=crop', // Energy/economy
  ],

  // ── Standard categories ───────────────────────────────────────────────────
  education: [
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=450&fit=crop',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=450&fit=crop',
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=450&fit=crop',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=450&fit=crop',
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=450&fit=crop',
    'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=450&fit=crop',
  ],

  jobs: [
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=450&fit=crop',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=450&fit=crop',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=450&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=450&fit=crop',
  ],

  health: [
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=450&fit=crop',
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=450&fit=crop',
    'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&h=450&fit=crop',
    'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=450&fit=crop',
    'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&h=450&fit=crop',
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=450&fit=crop',
  ],

  technology: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=450&fit=crop',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=450&fit=crop',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=450&fit=crop',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=450&fit=crop',
    'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=450&fit=crop',
  ],

  astro: [
    'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=450&fit=crop',
    'https://images.unsplash.com/photo-1464802686167-b4e46898879c?w=800&h=450&fit=crop',
    'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&h=450&fit=crop',
    'https://images.unsplash.com/photo-1520034475321-cbe63696469a?w=800&h=450&fit=crop',
    'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800&h=450&fit=crop',
  ],

  rental: [
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=450&fit=crop',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=450&fit=crop',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=450&fit=crop',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=450&fit=crop',
  ],

  uttarakhand: [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop', // Mountains
    'https://images.unsplash.com/photo-1594938298603-c8148c4b4ecd?w=800&h=450&fit=crop', // Uttarakhand hills
    'https://images.unsplash.com/photo-1570641963303-92ce4845ed4c?w=800&h=450&fit=crop', // Temple/river
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop', // Snow mountains
    'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&h=450&fit=crop', // Himalayas
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=450&fit=crop', // Himalayan valley
  ],

  podcast: [
    'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=450&fit=crop',
    'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&h=450&fit=crop',
    'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&h=450&fit=crop',
  ],

  quiz: [
    'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&h=450&fit=crop',
    'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=450&fit=crop',
  ],
};

// ── Keyword → topic rules (most specific first) ────────────────────────────────
const RULES = [
  // AI / quantum / tech science (before generic tech)
  { re: /quantum|qubit|willow|openai|chatgpt|gpt-?[45]|artificial intelligence|machine learning|क्वांटम|एआई/, topic: 'ai' },
  // Space / NASA (before generic)
  { re: /nasa|spacex|starship|artemis|chandrayaan|isro|rocket|satellite|mars|moon landing|अंतरिक्ष|रॉकेट|इसरो|चंद्रयान/, topic: 'space' },
  // Ukraine conflict (before Russia generic)
  { re: /ukraine|kyiv|zelensky|यूक्रेन|कीव|जेलेंस्की/, topic: 'ukraine' },
  // Countries
  { re: /china|chinese|beijing|shanghai|xi jinping|चीन|बीजिंग|शंघाई|शी जिनपिंग/, topic: 'china' },
  { re: /america|usa|united states|biden|trump|washington|white house|pentagon|congress|अमेरिका|वाशिंगटन|ट्रंप|बाइडन|पेंटागन/, topic: 'usa' },
  { re: /pakistan|islamabad|lahore|karachi|imran khan|nawaz|shahbaz|पाकिस्तान|इस्लामाबाद|लाहौर|कराची|नवाज|शहबाज|आईएसआई/, topic: 'pakistan' },
  { re: /russia|moscow|putin|kremlin|रूस|मॉस्को|पुतिन|क्रेमलिन/, topic: 'russia' },
  { re: /japan|tokyo|osaka|जापान|टोक्यो|ओसाका/, topic: 'japan' },
  { re: /uk|britain|london|england|westminster|starmer|sunak|ब्रिटेन|लंदन|इंग्लैंड/, topic: 'uk' },
  { re: /europe|eu|germany|france|berlin|paris|nato|यूरोप|जर्मनी|फ्रांस|पेरिस|नाटो/, topic: 'europe' },
  { re: /israel|gaza|hamas|palestine|hezbollah|iran|इजरायल|गाजा|हमास|फिलिस्तीन|हिजबुल्लाह|ईरान/, topic: 'middleeast' },
  { re: /saudi|iraq|dubai|arab|सऊदी|दुबई|अरब|मध्य पूर्व/, topic: 'middleeast' },
  { re: /nepal|kathmandu|नेपाल|काठमांडू/, topic: 'nepal' },
  { re: /bangladesh|sri lanka|maldives|myanmar|afghanistan|बांग्लादेश|श्रीलंका|मालदीव|अफगानिस्तान|तालिबान/, topic: 'southasia' },
  // Oil/energy
  { re: /oil price|crude oil|opec|petroleum|तेल की कीमत|कच्चा तेल/, topic: 'oil' },
  // Sports
  { re: /cricket|ipl|virat|dhoni|rohit|batting|bowling|wicket|क्रिकेट|आईपीएल/, topic: 'cricket' },
  { re: /hockey|football|badminton|olympics|medal|tournament|खेल|मेडल|खिलाड़ी/, topic: 'sports' },
  // Economy / finance
  { re: /rbi|reserve bank|repo rate|रिजर्व बैंक|रेपो रेट/, topic: 'economy' },
  { re: /budget|gdp|economy|sensex|nifty|inflation|rupee|tax|emi|stock market|imf|world bank|बजट|रुपया|महंगाई|शेयर|अर्थव्यवस्था|जीडीपी/, topic: 'economy' },
  // Military / war
  { re: /army|military|soldier|border|air force|navy|war|missile|defence|ceasefire|सेना|जवान|सीमा|वायुसेना|रक्षा|युद्ध|मिसाइल/, topic: 'army' },
  // Parliament / politics
  { re: /parliament|lok sabha|rajya sabha|bill|session|संसद|लोकसभा|राज्यसभा|विधेयक|अधिवेशन/, topic: 'parliament' },
  // Election
  { re: /election|vote|poll|ballot|evm|चुनाव|मतदान|उम्मीदवार|मतगणना/, topic: 'election' },
  // Court / law
  { re: /court|supreme court|verdict|judge|cbi|ed|police|arrested|crime|अदालत|न्यायालय|पुलिस|गिरफ्तार|फैसला/, topic: 'court' },
  // Railway / transport
  { re: /railway|train|vande bharat|metro|रेलवे|रेल|वंदे भारत|मेट्रो/, topic: 'railway' },
  // Infrastructure
  { re: /highway|airport|road|bridge|construction|smart city|हाईवे|सड़क|पुल|निर्माण/, topic: 'infrastructure' },
  // Climate / disaster
  { re: /climate change|global warming|cop\d+|carbon|arctic|glacier|जलवायु परिवर्तन|ग्लोबल वार्मिंग/, topic: 'climate' },
  { re: /flood|earthquake|cyclone|landslide|tsunami|disaster|बाढ़|भूकंप|तूफान|आपदा|भूस्खलन|सुनामी/, topic: 'disaster' },
  // Environment
  { re: /pollution|aqi|environment|forest|wildlife|पर्यावरण|प्रदूषण|जलवायु|जंगल/, topic: 'environment' },
  // Agriculture
  { re: /farmer|kisan|msp|crop|agriculture|irrigation|wheat|rice|किसान|फसल|खेती|कृषि|गेहूं|धान/, topic: 'agriculture' },
  // Health
  { re: /hospital|doctor|vaccine|covid|disease|medicine|health|patient|अस्पताल|डॉक्टर|वैक्सीन|बीमारी|दवा|स्वास्थ्य/, topic: 'health' },
  // Education
  { re: /school|college|university|neet|jee|cbse|upsc|exam|admission|scholarship|शिक्षा|विद्यालय|परीक्षा|छात्र|बोर्ड रिजल्ट/, topic: 'education' },
  // Technology
  { re: /technology|digital|mobile|cyber|5g|upi|tech|तकनीक|डिजिटल|साइबर/, topic: 'ai' },
  // Schemes / welfare
  { re: /yojana|scheme|welfare|subsidy|ayushman|योजना|लाभ|सरकारी|सब्सिडी|आयुष्मान/, topic: 'schemes' },
  // Uttarakhand
  { re: /uttarakhand|dehradun|haridwar|kedarnath|badrinath|rishikesh|nainital|chardham|उत्तराखंड|देहरादून|हरिद्वार|केदारनाथ/, topic: 'uttarakhand' },
  // Astro
  { re: /rashifal|horoscope|kundali|astrology|राशिफल|ज्योतिष|राशि/, topic: 'astro' },
  // Jobs
  { re: /job|recruitment|vacancy|hiring|naukri|ssc|rrb|upsc|भर्ती|नौकरी|रोजगार|रिक्रूटमेंट/, topic: 'jobs' },
  // Rental
  { re: /house|rental|property|pg|किराया|मकान|प्रॉपर्टी/, topic: 'rental' },
];

const TOPIC_POOL = {
  china: POOL.china, usa: POOL.usa, pakistan: POOL.pakistan, russia: POOL.russia,
  ukraine: POOL.ukraine, japan: POOL.japan, uk: POOL.uk, europe: POOL.europe,
  middleeast: POOL.middleeast, nepal: POOL.nepal, southasia: POOL.southasia,
  oil: POOL.oil, election: POOL.election, parliament: POOL.parliament,
  army: POOL.army, war: POOL.war, disaster: POOL.disaster, cricket: POOL.cricket,
  sports: POOL.sports, economy: POOL.economy, court: POOL.court,
  railway: POOL.railway, infrastructure: POOL.infrastructure,
  environment: POOL.environment, climate: POOL.climate,
  agriculture: POOL.agriculture, space: POOL.space, ai: POOL.ai,
  schemes: POOL.schemes, national: POOL.national, world: POOL.world,
  education: POOL.education, jobs: POOL.jobs, health: POOL.health,
  technology: POOL.technology, astro: POOL.astro, rental: POOL.rental,
  uttarakhand: POOL.uttarakhand, podcast: POOL.podcast, quiz: POOL.quiz,
  medical: POOL.health, defence: POOL.army,
};

export const SAFE_FALLBACK = 'https://picsum.photos/seed/news/800/450';

/**
 * Returns a topic-relevant image for an article.
 * Matches on title + summary + category for best accuracy.
 */
export const getCategoryFallbackImage = (category = '', articleId = '', title = '', summary = '') => {
  const needle = `${title} ${summary} ${category}`.toLowerCase();
  const hash   = stableHash(articleId || title || 'default');

  // 1. Keyword match → specific topic pool
  for (const { re, topic } of RULES) {
    if (re.test(needle)) {
      const pool = TOPIC_POOL[topic] || POOL.national;
      return pool[hash % pool.length];
    }
  }

  // 2. Direct category pool
  const pool = POOL[category] || POOL.national;
  return pool[hash % pool.length];
};
