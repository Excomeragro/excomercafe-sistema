-- EXCOMERCAFE - Fix RLS para sincronizacion desde la app
-- Ejecutar completo en Supabase SQL Editor.
-- Corrige el error:
-- new row violates row-level security policy for table "distribucion_tiendona"

begin;

grant usage on schema public to anon, authenticated;
grant usage, select on all sequences in schema public to anon, authenticated;

do $$
declare
  t text;
  p record;
  tablas text[] := array[
    'ventas_agromercado',
    'ventas_agromercado_pendientes',
    'inventario_movimientos',
    'distribucion_tiendona',
    'distribucion_cda',
    'personas_sistema'
  ];
begin
  foreach t in array tablas loop
    if to_regclass('public.' || t) is not null then
      execute format('alter table public.%I enable row level security', t);
      execute format('grant select, insert, update, delete on public.%I to anon, authenticated', t);

      for p in
        select policyname
        from pg_policies
        where schemaname = 'public' and tablename = t
      loop
        execute format('drop policy if exists %I on public.%I', p.policyname, t);
      end loop;

      execute format('create policy %I on public.%I for select to anon, authenticated using (true)', t || '_sync_select', t);
      execute format('create policy %I on public.%I for insert to anon, authenticated with check (true)', t || '_sync_insert', t);
      execute format('create policy %I on public.%I for update to anon, authenticated using (true) with check (true)', t || '_sync_update', t);
      execute format('create policy %I on public.%I for delete to anon, authenticated using (true)', t || '_sync_delete', t);
    end if;
  end loop;
end $$;

-- Asegurar columnas e indices usados por upsert.
alter table if exists public.ventas_agromercado
add column if not exists local_id text,
add column if not exists payload jsonb;

alter table if exists public.ventas_agromercado_pendientes
add column if not exists local_id text,
add column if not exists payload jsonb;

alter table if exists public.inventario_movimientos
add column if not exists local_id text,
add column if not exists payload jsonb;

alter table if exists public.distribucion_tiendona
add column if not exists local_id text,
add column if not exists payload jsonb;

alter table if exists public.distribucion_cda
add column if not exists local_id text,
add column if not exists payload jsonb;

alter table if exists public.personas_sistema
add column if not exists local_id text,
add column if not exists payload jsonb;

create unique index if not exists ventas_agromercado_local_id_key
on public.ventas_agromercado(local_id);

create unique index if not exists ventas_agromercado_pendientes_local_id_key
on public.ventas_agromercado_pendientes(local_id);

create unique index if not exists inventario_movimientos_local_id_key
on public.inventario_movimientos(local_id);

create unique index if not exists distribucion_tiendona_local_id_key
on public.distribucion_tiendona(local_id);

create unique index if not exists distribucion_cda_local_id_key
on public.distribucion_cda(local_id);

create unique index if not exists personas_sistema_local_id_key
on public.personas_sistema(local_id);

commit;
