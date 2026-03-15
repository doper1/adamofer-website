export default function Layout({ children }) {
  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        * { box-sizing: border-box; }

        body {
          font-family: 'Inter', sans-serif;
          background: #080808;
          color: white;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #0d0d0d;
        }
        ::-webkit-scrollbar-thumb {
          background: #7c3aed55;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #7c3aed99;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
      {children}
    </div>
  );
}