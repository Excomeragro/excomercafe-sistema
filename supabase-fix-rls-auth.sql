-- Corrige politicas RLS para usuarios autenticados EXCOMERCAFE.
-- Ejecutar en Supabase SQL Editor.

begin;

-- Columnas de usuario necesarias para chat/presencia/cuadres.
alter table public.presence_online
add column if not exists user_id uuid default auth.uid();

alter table public.chat_messages
add column if not exists user_id uuid default auth.uid(),
add column if not exists privado boolean default false,
add column if not exists destinatario_user_id uuid,
add column if not exists destinatario_client_id text,
add column if not exists destinatario_nombre text;

alter table public.estado_cuadres
add column if not exists user_id uuid default auth.uid();

alter table public.inventario_movimientos
add column if not exists user_id uuid default auth.uid();

-- PRESENCE: usuarios autenticados pueden ver y actualizar presencia.
drop policy if exists "presence_online_select" on public.presence_online;
drop policy if exists "presence_online_insert" on public.presence_online;
drop policy if exists "presence_online_update" on public.presence_online;
drop policy if exists "presence_online_delete" on public.presence_online;
drop policy if exists "presence_online_auth_select" on public.presence_online;
drop policy if exists "presence_online_auth_insert" on public.presence_online;
drop policy if exists "presence_online_auth_update" on public.presence_online;
drop policy if exists "presence_online_auth_delete" on public.presence_online;

alter table public.presence_online enable row level security;

create policy "presence_online_auth_select"
on public.presence_online for select
to authenticated
using (true);

create policy "presence_online_auth_insert"
on public.presence_online for insert
to authenticated
with check (true);

create policy "presence_online_auth_update"
on public.presence_online for update
to authenticated
using (true)
with check (true);

create policy "presence_online_auth_delete"
on public.presence_online for delete
to authenticated
using (true);

-- CHAT: usuarios autenticados pueden usar el chat.
drop policy if exists "chat_messages_select" on public.chat_messages;
drop policy if exists "chat_messages_insert" on public.chat_messages;
drop policy if exists "chat_messages_update" on public.chat_messages;
drop policy if exists "chat_messages_delete" on public.chat_messages;
drop policy if exists "chat_messages_auth_select" on public.chat_messages;
drop policy if exists "chat_messages_auth_insert" on public.chat_messages;
drop policy if exists "chat_messages_auth_update" on public.chat_messages;
drop policy if exists "chat_messages_auth_delete" on public.chat_messages;

alter table public.chat_messages enable row level security;

create policy "chat_messages_auth_select"
on public.chat_messages for select
to authenticated
using (true);

create policy "chat_messages_auth_insert"
on public.chat_messages for insert
to authenticated
with check (true);

create policy "chat_messages_auth_update"
on public.chat_messages for update
to authenticated
using (true)
with check (true);

create policy "chat_messages_auth_delete"
on public.chat_messages for delete
to authenticated
using (true);

-- CUADRES: usuarios autenticados pueden sincronizar estados de cuadre.
drop policy if exists "estado_cuadres_select" on public.estado_cuadres;
drop policy if exists "estado_cuadres_insert" on public.estado_cuadres;
drop policy if exists "estado_cuadres_update" on public.estado_cuadres;
drop policy if exists "estado_cuadres_delete" on public.estado_cuadres;
drop policy if exists "estado_cuadres_auth_select" on public.estado_cuadres;
drop policy if exists "estado_cuadres_auth_insert" on public.estado_cuadres;
drop policy if exists "estado_cuadres_auth_update" on public.estado_cuadres;
drop policy if exists "estado_cuadres_auth_delete" on public.estado_cuadres;

alter table public.estado_cuadres enable row level security;

create policy "estado_cuadres_auth_select"
on public.estado_cuadres for select
to authenticated
using (true);

create policy "estado_cuadres_auth_insert"
on public.estado_cuadres for insert
to authenticated
with check (true);

create policy "estado_cuadres_auth_update"
on public.estado_cuadres for update
to authenticated
using (true)
with check (true);

create policy "estado_cuadres_auth_delete"
on public.estado_cuadres for delete
to authenticated
using (true);

-- INVENTARIO: usuarios autenticados pueden sincronizar movimientos.
drop policy if exists "inventario_movimientos_select" on public.inventario_movimientos;
drop policy if exists "inventario_movimientos_insert" on public.inventario_movimientos;
drop policy if exists "inventario_movimientos_update" on public.inventario_movimientos;
drop policy if exists "inventario_movimientos_delete" on public.inventario_movimientos;
drop policy if exists "inventario_movimientos_auth_select" on public.inventario_movimientos;
drop policy if exists "inventario_movimientos_auth_insert" on public.inventario_movimientos;
drop policy if exists "inventario_movimientos_auth_update" on public.inventario_movimientos;
drop policy if exists "inventario_movimientos_auth_delete" on public.inventario_movimientos;

alter table public.inventario_movimientos enable row level security;

create policy "inventario_movimientos_auth_select"
on public.inventario_movimientos for select
to authenticated
using (true);

create policy "inventario_movimientos_auth_insert"
on public.inventario_movimientos for insert
to authenticated
with check (true);

create policy "inventario_movimientos_auth_update"
on public.inventario_movimientos for update
to authenticated
using (true)
with check (true);

create policy "inventario_movimientos_auth_delete"
on public.inventario_movimientos for delete
to authenticated
using (true);

commit;
