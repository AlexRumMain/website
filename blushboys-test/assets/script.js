const SUPABASE_URL = 'https://llxryewybczqjikbhjpi.supabase.co';        // ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxseHJ5ZXd5YmN6cWppa2JoanBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4NDQ2NTIsImV4cCI6MjA3OTQyMDY1Mn0.reJobIwuyBxLagmrOO6x2-S0-oBvpOSFw9w0r7NARKE'; // ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentUser = null;

async function checkAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    if (!location.href.includes('login.html') && !location.href.includes('index.html')) {
      location.href = 'login.html';
    }
    return null;
  }
  currentUser = session.user;
  return session.user;
}

// Универсальная функция выхода
async function logout() {
  await supabase.auth.signOut();
  location.href = 'login.html';
}

// Авто-обновление задач каждые 15 сек
setInterval(() => {
  if (currentUser && (location.href.includes('dashboard.html') || location.href.includes('admin.html'))) {
    loadTasks();
  }
}, 15000);