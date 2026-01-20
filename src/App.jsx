import PhysicsClassification from './components/PhysicsClassification';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar />
      
      <main className="flex-grow w-full max-w-6xl mx-auto p-6">
        <PhysicsClassification />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;