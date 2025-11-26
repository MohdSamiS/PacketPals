import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Packets from './pages/Packets';
import PacketDetail from './pages/PacketDetail';
import Transmissions from './pages/Transmissions';
import Tools from './pages/Tools';
import About from './pages/About';
import Contact from './pages/Contact';
import IpSubnetCalculator from './pages/IpSubnetCalculator';


const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/packets" element={<Packets />} />
          <Route path="/packets/:id" element={<PacketDetail />} />
          <Route path="/transmissions" element={<Transmissions />} />
          {/* Redirect old route just in case */}
          <Route path="/transitions" element={<Transmissions />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/ip-subnet-calculator" element={<IpSubnetCalculator />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;