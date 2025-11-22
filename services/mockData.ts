import { Packet, Transmission, Tool, Category, SocialLink } from '../types';

export const PACKETS: Packet[] = [
  {
    id: 'p-01',
    number: '01',
    title: 'Understanding TCP/IP Layer Architecture',
    excerpt: 'A deep dive into the encapsulation process and how data traverses the seven layers of the OSI model versus the four layers of TCP/IP.',
    content: `
      <p class="mb-4">The Transmission Control Protocol/Internet Protocol (TCP/IP) suite is the engine for the Internet and networks worldwide. Its simplicity and robustness have made it the standard for communication.</p>
      <h3 class="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">The Four Layers</h3>
      <p class="mb-4">Unlike the OSI model's seven layers, TCP/IP condenses functions into four abstraction layers:</p>
      <ul class="list-disc pl-5 space-y-2 mb-6 text-slate-600 dark:text-brand-muted">
        <li><strong class="text-brand-net">Application Layer:</strong> Represents data to the user plus encoding and dialog control.</li>
        <li><strong class="text-brand-net">Transport Layer:</strong> Supports communication between diverse devices across diverse networks.</li>
        <li><strong class="text-brand-net">Internet Layer:</strong> Determines the best path through the network.</li>
        <li><strong class="text-brand-net">Network Access Layer:</strong> Controls the hardware devices and media that make up the network.</li>
      </ul>
      <div class="bg-slate-900 p-4 rounded-md border border-slate-700 font-mono text-sm my-6">
        <span class="text-brand-muted">// Simple Python socket example (Transport Layer)</span><br/>
        <span class="text-pink-400">import</span> socket<br/><br/>
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)<br/>
        s.connect((<span class="text-green-400">'www.packetpals.com'</span>, <span class="text-blue-400">80</span>))<br/>
        s.sendall(<span class="text-green-400">b'GET / HTTP/1.1\\r\\nHost: packetpals.com\\r\\n\\r\\n'</span>)<br/>
        data = s.recv(<span class="text-blue-400">1024</span>)<br/>
        s.close()<br/>
      </div>
    `,
    category: Category.NETWORKING,
    author: 'Alex Chen',
    date: '2023-10-15',
    readTime: '8 min',
    tags: ['TCP/IP', 'OSI', 'Fundamentals'],
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bbcbf?q=80&w=2071&auto=format&fit=crop'
  },
  {
    id: 'p-14',
    number: '14',
    title: 'Zero Trust Security Explained',
    excerpt: 'Why "never trust, always verify" is becoming the gold standard in enterprise architecture.',
    content: `
      <p class="mb-4">Traditional perimeter-based security models are obsolete. Zero Trust assumes that a breach is inevitable or has likely already occurred.</p>
      <h3 class="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">Core Principles</h3>
      <p class="mb-4">Zero Trust is built upon three pillars:</p>
      <ol class="list-decimal pl-5 space-y-2 mb-6 text-slate-600 dark:text-brand-muted">
        <li><strong>Verify Explicitly:</strong> Always authenticate and authorize based on all available data points.</li>
        <li><strong>Use Least Privilege Access:</strong> Limit user access with Just-In-Time and Just-Enough-Access (JIT/JEA).</li>
        <li><strong>Assume Breach:</strong> Minimize blast radius and segment access. Verify end-to-end encryption.</li>
      </ol>
    `,
    category: Category.CYBERSECURITY,
    author: 'Sarah Jenkins',
    date: '2023-11-02',
    readTime: '12 min',
    tags: ['Security', 'Zero Trust', 'Enterprise'],
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'p-iot-01',
    number: '101',
    title: 'ESP32 vs Arduino: Choosing Your Microcontroller',
    excerpt: 'A comprehensive comparison of the classic Arduino Uno and the feature-rich ESP32 for your next IoT project.',
    content: `
      <p class="mb-4">When starting an electronics project, the first question is often: "Which board should I use?" The Arduino ecosystem has dominated for years, but Espressif's ESP32 has emerged as a powerhouse for connected applications.</p>
      
      <h3 class="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">Arduino Uno (ATmega328P)</h3>
      <p class="mb-4">The classic choice. It's robust, 5V tolerant, and has massive community support. However, it lacks native connectivity (WiFi/Bluetooth) and runs at a slower 16MHz.</p>
      
      <h3 class="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">ESP32</h3>
      <p class="mb-4">The modern contender. It features dual cores, runs at up to 240MHz, and most importantly, includes built-in WiFi and Bluetooth. It operates at 3.3V logic, which requires care when interfacing with older sensors.</p>

      <div class="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg border-l-4 border-brand-accent my-6">
        <p class="italic text-slate-700 dark:text-slate-300">"If your project needs to talk to the internet, go with the ESP32. If you are blinking LEDs or learning basic digital logic, the Arduino Uno is still a great teacher."</p>
      </div>
    `,
    category: Category.IOT,
    author: 'Mohammed Sami',
    date: '2024-04-05',
    readTime: '10 min',
    tags: ['ESP32', 'Arduino', 'Hardware', 'Microcontrollers'],
    image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'p-iot-02',
    number: '102',
    title: 'MQTT: The Language of IoT',
    excerpt: 'Understanding the lightweight Publish/Subscribe protocol that powers home automation and industrial sensors.',
    content: `
      <p class="mb-4">HTTP is heavy. When you have a temperature sensor running on a battery, you can't afford the overhead of a full REST API call with headers and handshakes. Enter MQTT (Message Queuing Telemetry Transport).</p>
      
      <h3 class="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">Publish / Subscribe Model</h3>
      <p class="mb-4">Unlike the client-server model of the web, MQTT uses a Broker. Devices "publish" messages to a "topic" (e.g., <code>home/livingroom/temp</code>), and other devices "subscribe" to that topic to receive updates.</p>
      
      <div class="bg-slate-900 p-4 rounded-md border border-slate-700 font-mono text-sm my-6">
        <span class="text-brand-muted">// Arduino / C++ MQTT Example</span><br/>
        client.publish(<span class="text-green-400">"sensors/humidity"</span>, <span class="text-blue-400">"45.2"</span>);<br/><br/>
        <span class="text-brand-muted">// Subscribing device receives this instantly</span>
      </div>
    `,
    category: Category.IOT,
    author: 'Alex Chen',
    date: '2024-04-12',
    readTime: '8 min',
    tags: ['MQTT', 'IoT', 'Protocols', 'Automation'],
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'p-22',
    number: '22',
    title: 'Kubernetes Networking: CNI Plugins',
    excerpt: 'Demystifying how pods communicate across nodes using Calico, Flannel, and Cilium.',
    content: '<p>Kubernetes networking is often considered the hardest part of the ecosystem. Understanding the Container Network Interface (CNI) is crucial for any Cloud Engineer.</p>',
    category: Category.CLOUD,
    author: 'David Ross',
    date: '2023-12-10',
    readTime: '15 min',
    tags: ['K8s', 'Cloud Native', 'CNI'],
    image: 'https://images.unsplash.com/photo-1667372393119-c85c02088947?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'p-33',
    number: '33',
    title: 'BGP: The Internet\'s GPS',
    excerpt: 'How Autonomous Systems exchange routing information to keep the global internet connected.',
    content: '<p>Border Gateway Protocol (BGP) is the postal service of the internet. Without it, data packets would not know which path to take to reach their destination across the complex web of ISPs.</p>',
    category: Category.NETWORKING,
    author: 'Alex Chen',
    date: '2024-01-05',
    readTime: '10 min',
    tags: ['BGP', 'Routing', 'ISP'],
    image: 'https://images.unsplash.com/photo-1520869562399-e772f042f422?q=80&w=2073&auto=format&fit=crop'
  },
  {
    id: 'p-iot-03',
    number: '103',
    title: 'Interfacing Sensors: I2C vs SPI',
    excerpt: 'Connecting the physical world to code. When to use Inter-Integrated Circuit vs Serial Peripheral Interface.',
    content: `
      <p class="mb-4">Digital sensors speak specific protocols. The two most common for board-level communication are I2C and SPI. Knowing which to choose affects your wiring complexity and speed.</p>
      
      <h3 class="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">I2C (Inter-Integrated Circuit)</h3>
      <p class="mb-4">Uses only two wires (SDA and SCL). It supports multiple devices on the same bus using addresses. Great for simplicity, but slower.</p>
      
      <h3 class="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">SPI (Serial Peripheral Interface)</h3>
      <p class="mb-4">Uses four wires (MISO, MOSI, SCK, CS). It's full-duplex and much faster than I2C, making it ideal for displays or SD card readers, but requires more pins for multiple devices.</p>
    `,
    category: Category.IOT,
    author: 'Mohammed Sami',
    date: '2024-04-18',
    readTime: '11 min',
    tags: ['Sensors', 'Embedded', 'Hardware'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'p-41',
    number: '41',
    title: 'Cloud Networking: AWS VPC vs Azure VNet',
    excerpt: 'A comparative analysis of peering, gateways, and private link implementations in the two major clouds.',
    content: '<p>While concepts like subnets and route tables are universal, the implementation details between AWS Virtual Private Clouds (VPCs) and Azure Virtual Networks (VNets) differ significantly in practice.</p>',
    category: Category.CLOUD,
    author: 'David Ross',
    date: '2024-01-22',
    readTime: '14 min',
    tags: ['AWS', 'Azure', 'VPC'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop'
  },
  {
    id: 'p-55',
    number: '55',
    title: 'Anatomy of a Spear-Phishing Campaign',
    excerpt: 'Dissecting email headers and malicious payloads from a real-world social engineering attack.',
    content: '<p>Social engineering remains the #1 vector for initial compromise. In this packet, we analyze a de-weaponized sample of a targeted phishing email.</p>',
    category: Category.CYBERSECURITY,
    author: 'Sarah Jenkins',
    date: '2024-02-08',
    readTime: '9 min',
    tags: ['Phishing', 'Forensics', 'Email'],
    image: 'https://images.unsplash.com/photo-1563206767-5b1d97209375?q=80&w=2072&auto=format&fit=crop'
  },
  {
    id: 'p-iot-04',
    number: '104',
    title: 'Home Automation: Beyond Smart Bulbs',
    excerpt: 'Building a private, cloud-free smart home using Home Assistant, Zigbee, and Docker.',
    content: `
      <p class="mb-4">Most "Smart Home" devices rely on external cloud servers. If your internet goes down, so does your light switch. Real automation happens locally.</p>
      <p class="mb-4">By using a Raspberry Pi running <strong>Home Assistant</strong> and a Zigbee USB coordinator, you can control Philips Hue, IKEA Tradfri, and Xiaomi sensors without a single packet leaving your LAN.</p>
    `,
    category: Category.IOT,
    author: 'Sarah Jenkins',
    date: '2024-04-25',
    readTime: '14 min',
    tags: ['Home Assistant', 'Zigbee', 'Privacy'],
    image: 'https://images.unsplash.com/photo-1558002038-1091a166111c?q=80&w=2071&auto=format&fit=crop'
  },
  {
    id: 'p-62',
    number: '62',
    title: 'Mastering IPv6 Addressing Modes',
    excerpt: 'Understanding SLAAC, DHCPv6, and Link-Local addresses to prepare for the inevitable switch.',
    content: '<p>IPv4 exhaustion is old news. The real challenge is mastering the new paradigms of IPv6, specifically how hosts auto-configure their interfaces without a central DHCP server.</p>',
    category: Category.NETWORKING,
    author: 'Alex Chen',
    date: '2024-02-15',
    readTime: '11 min',
    tags: ['IPv6', 'SLAAC', 'Addressing'],
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 'p-78',
    number: '78',
    title: 'Container Security Best Practices',
    excerpt: 'Hardening Docker images and runtime environments against privilege escalation attacks.',
    content: '<p>Running containers as root is a recipe for disaster. We explore capability dropping, read-only filesystems, and scanning images for CVEs before deployment.</p>',
    category: Category.CLOUD,
    author: 'David Ross',
    date: '2024-03-01',
    readTime: '13 min',
    tags: ['Docker', 'Security', 'DevSecOps'],
    image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?q=80&w=2071&auto=format&fit=crop'
  },
  {
    id: 'p-84',
    number: '84',
    title: 'WiFi 7 (802.11be): What Engineers Need to Know',
    excerpt: 'Multi-Link Operation (MLO), 320MHz channels, and the future of wireless enterprise networks.',
    content: '<p>WiFi 7 is not just a speed upgrade; it drastically reduces latency and increases reliability through Multi-Link Operation, allowing devices to send data across multiple bands simultaneously.</p>',
    category: Category.NETWORKING,
    author: 'Alex Chen',
    date: '2024-03-12',
    readTime: '7 min',
    tags: ['WiFi', 'Wireless', 'Hardware'],
    image: 'https://images.unsplash.com/photo-1563770095-39d468f98753?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'p-iot-05',
    number: '105',
    title: 'Industrial IoT: PLC Basics',
    excerpt: 'Bridging the gap between IT and OT. How Programmable Logic Controllers operate in SCADA environments.',
    content: `
      <p class="mb-4">In the Operational Technology (OT) world, reliability is king. PLCs (Programmable Logic Controllers) are the ruggedized computers that control assembly lines and power plants.</p>
      <p class="mb-4">Unlike standard servers, PLCs operate in real-time loops, scanning inputs and setting outputs based on Ladder Logic. Modern IIoT gateways are now extracting this data for predictive maintenance in the cloud.</p>
    `,
    category: Category.IOT,
    author: 'David Ross',
    date: '2024-05-02',
    readTime: '12 min',
    tags: ['PLC', 'SCADA', 'IIoT', 'Industrial'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'p-91',
    number: '91',
    title: 'Infrastructure as Code: Terraform State Management',
    excerpt: 'Managing state files, locking strategies, and module structures for scalable cloud deployments.',
    content: '<p>The state file is the holy grail of Terraform. Losing it means losing track of your infrastructure. We discuss remote state storage in S3 with DynamoDB locking.</p>',
    category: Category.CLOUD,
    author: 'David Ross',
    date: '2024-03-20',
    readTime: '16 min',
    tags: ['Terraform', 'IaC', 'DevOps'],
    image: 'https://images.unsplash.com/photo-1667372393086-9d4001d51cf1?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'p-99',
    number: '99',
    title: 'Reducing Noise in SIEM Logs',
    excerpt: 'Strategies for tuning correlation rules to detect actual threats over false positives.',
    content: '<p>Alert fatigue is real. A SIEM that alerts on everything alerts on nothing. Learn how to tune your ingestion filters and correlation rules to focus on high-fidelity signals.</p>',
    category: Category.CYBERSECURITY,
    author: 'Sarah Jenkins',
    date: '2024-03-28',
    readTime: '12 min',
    tags: ['SIEM', 'SOC', 'Logging'],
    image: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?q=80&w=2007&auto=format&fit=crop'
  }
];

export const TRANSMISSIONS: Transmission[] = [
  {
    id: 't-045',
    number: '045',
    title: 'Packet Pals Tool Stack Update',
    description: 'We have deployed the new subnet visualizer to the Tools dashboard. Performance improved by 40%.',
    date: '2 Days Ago',
    type: 'Platform Update'
  },
  {
    id: 't-021',
    number: '021',
    title: 'New CVE Alert in OpenSSL',
    description: 'Critical vulnerability discovered in older OpenSSL versions. Patch immediately if you are running version < 3.0.7.',
    date: '1 Week Ago',
    type: 'Security Alert'
  },
  {
    id: 't-018',
    number: '018',
    title: 'Cloud Provider Outage Analysis',
    description: 'Detailed breakdown of the recent us-east-1 outage and lessons learned for redundancy.',
    date: '2 Weeks Ago',
    type: 'Industry News'
  }
];

export const TOOLS: Tool[] = [
  {
    id: 'tool-1',
    name: 'IP Subnet Calculator',
    description: 'Calculate network ranges, broadcast addresses, and usable hosts from CIDR.',
    category: 'IP Tools',
    icon: 'Calculator',
    status: 'Active'
  },
  {
    id: 'tool-2',
    name: 'CIDR Converter',
    description: 'Convert between subnet masks and CIDR notation instantly.',
    category: 'IP Tools',
    icon: 'Binary',
    status: 'Active'
  },
  {
    id: 'tool-3',
    name: 'Port Scanner Interface',
    description: 'Check open ports on a target IP (authorized use only).',
    category: 'Security',
    icon: 'Radar',
    status: 'Beta'
  },
  {
    id: 'tool-4',
    name: 'DNS Lookup Tool',
    description: 'Perform A, AAAA, MX, and TXT record lookups.',
    category: 'Diagnostics',
    icon: 'Globe',
    status: 'Active'
  },
  {
    id: 'tool-5',
    name: 'SSL Cert Checker',
    description: 'Validate certificate chains and expiry dates.',
    category: 'Security',
    icon: 'Lock',
    status: 'Coming Soon'
  },
  {
    id: 'tool-6',
    name: 'Firewall Visualizer',
    description: 'Visualize iptables or security group rules.',
    category: 'Cloud',
    icon: 'Shield',
    status: 'Coming Soon'
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'X (Twitter)',
    url: 'https://x.com/MOHAMMEDSAMISH4',
    iconPath: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z',
    viewBox: '0 0 24 24'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/mohd-sami/',
    iconPath: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    viewBox: '0 0 24 24'
  },
  {
    name: 'Reddit',
    url: 'https://www.reddit.com/user/Time_Control_9/',
    iconPath: 'M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.249-1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z',
    viewBox: '0 0 24 24'
  },
  {
    name: 'Twitch',
    url: 'https://www.twitch.tv/',
    iconPath: 'M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z',
    viewBox: '0 0 24 24'
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=100090274434948',
    iconPath: 'M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.797 1.657-2.797 3.393v.579h3.394l-1.154 3.667h-2.24v7.98c0 .087-.016.171-.016.258a13.407 13.407 0 1 1-5.001 0z',
    viewBox: '0 0 24 24'
  },
  {
    name: 'Threads',
    url: 'https://www.threads.net/@sa.mi.9.9',
    iconPath: 'M12.31 8.05c-2.4 0-3.78 1.68-3.78 3.95 0 2.23 1.31 3.9 3.78 3.9 1.33 0 2.17-.49 2.76-1.21.17-.21.46-.2.62.01.16.21.14.52-.06.74-.83 1.01-1.99 1.66-3.59 1.66-2.85 0-4.71-2.02-4.71-4.82 0-2.82 1.95-4.85 4.71-4.85 1.93 0 3.23 1.02 3.91 2.22h.03v-2.1h1.2v7.12c0 2.06-.81 3.3-2.41 3.3-1.56 0-2.28-1.05-2.28-2.18h-1.18c0 1.68 1.16 3.08 3.46 3.08 2.35 0 3.59-1.77 3.59-4.2V7.24h-1.07l-.13.88c-.77-1.41-2.2-2.17-4.18-2.17H12.31ZM12 1.25c5.94 0 10.75 4.81 10.75 10.75 0 5.94-4.81 10.75-10.75 10.75S1.25 17.94 1.25 12 6.06 1.25 12 1.25Zm.31 7.7c-1.86 0-2.88 1.45-2.88 3.05 0 1.62 1.02 3 2.88 3 1.86 0 2.88-1.38 2.88-3 0-1.6-1.02-3.05-2.88-3.05Z',
    viewBox: '0 0 24 24'
  },
  {
    name: 'Tumblr',
    url: 'https://www.tumblr.com/dashboard',
    iconPath: 'M14.563 24c-5.093 0-7.031-3.756-7.031-6.411V9.747H5.116V6.648c3.63-1.313 4.512-4.596 4.71-6.469C9.84.051 9.941 0 9.999 0h3.517v6.114h4.801v3.633h-4.82v7.47c.016 1.001.375 2.371 2.207 2.371h.09c.631-.02 1.486-.205 1.936-.419l1.156 3.425c-.436.636-2.4 1.374-4.156 1.404h-.178l.171.002z',
    viewBox: '0 0 24 24'
  },
  {
    name: 'Quora',
    url: 'https://www.quora.com/profile/MOHAMMED-SAMI-SHAIKH-1',
    iconPath: 'M13.193 14.91c-1.22 1.025-2.719 1.62-4.344 1.62-3.867 0-7-3.134-7-7s3.133-7 7-7c3.865 0 7 3.134 7 7 0 1.456-.481 2.809-1.295 3.912l2.306 2.726-1.639 1.386-2.028-2.644zm-4.344-10.38c-2.761 0-5 2.238-5 5s2.239 5 5 5c2.762 0 5-2.238 5-5s-2.238-5-5-5z',
    viewBox: '0 0 24 24'
  },
  {
    name: 'Pinterest',
    url: 'https://in.pinterest.com/samishahid537/',
    iconPath: 'M12 0c-6.627 0-12 5.373-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.65 0-5.789 2.738-5.789 5.57 0 1.103.425 2.286.956 2.928.105.128.12.24.09.435-.098.407-.316 1.287-.359 1.467-.056.238-.188.289-.433.174-1.616-.751-2.624-3.11-2.624-5.012 0-4.079 2.964-7.823 8.545-7.823 4.486 0 7.972 3.198 7.972 7.466 0 4.458-2.805 8.035-6.701 8.035-1.308 0-2.536-.679-2.958-1.482 0 0-.708 2.695-.879 3.355-.317 1.219-1.176 2.742-1.756 3.68 1.589.482 3.283.744 5.032.744 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z',
    viewBox: '0 0 24 24'
  },
  {
    name: 'Discord',
    url: 'https://discord.com/login?redirect_to=%2Fchannels%2F%40me',
    iconPath: 'M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z',
    viewBox: '0 0 24 24'
  }
];