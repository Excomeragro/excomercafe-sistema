-- Correccion minima para sincronizar inventario_movimientos.
-- Ejecutar en Supabase SQL Editor.

begin;

alter table public.inventario_movimientos
add column if not exists user_id uuid default auth.uid();

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
