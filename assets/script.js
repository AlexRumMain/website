// assets/script.js — ЕДИНЫЙ ФАЙЛ ДЛЯ ВСЕГО САЙТА
const SUPABASE_URL = 'https://ТВОЙ-ПРОЕКТ.supabase.co';        // ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; // ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Проверка авторизации на всех страницах
async function requireAuth(redirectTo = 'login.html') {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    location.href = redirectTo;
    return null;
  }
  return session.user;
}

// Авто-перенаправление по роли
async function redirectByRole() {
  const user = await requireAuth();
  if (!user) return;

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  const role = profile?.role || 'employee';

  if (role === 'admin_owner' || role === 'admin_service') {
    if (!location.href.includes('admin.html')) location.href = 'admin.html';
  } else {
    if (!location.href.includes('dashboard.html')) location.href = 'dashboard.html';
  }
}

// Выход
async function logout() {
  await supabase.auth.signOut();
  location.href = 'login.html';
}
