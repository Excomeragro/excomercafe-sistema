-- Reinicio de usuarios EXCOMERCAFE
-- Ejecutar en Supabase SQL Editor despues de hacer respaldo.
-- Luego borrar/crear usuarios en Authentication > Users.

begin;

-- Sesiones visibles, chat y estados ligados a usuarios anteriores.
truncate table public.presence_online restart identity cascade;
truncate table public.chat_messages restart identity cascade;
truncate table public.estado_cuadres restart identity cascade;

-- Si quieres empezar tambien sin respaldos remotos, descomenta estas lineas:
-- truncate table public.backup_logs restart identity cascade;
-- truncate table public.backups restart identity cascade;

commit;

-- IMPORTANTE:
-- Los usuarios de Supabase Auth se borran desde el Dashboard:
-- Authentication > Users > seleccionar usuarios > Delete users.
-- No pongas una service_role key dentro de index.html ni en ningun archivo publico.
