-- EXCOMERCAFE - bloqueo del portal cuando hay envio pendiente
-- Ejecutar en Supabase SQL Editor.

create or replace function public.portal_agromercado_pendiente(p_agromercado text)
returns table (
  pendiente boolean,
  fecha text,
  creado_en timestamptz
)
language sql
security definer
set search_path = public
as $$
  select
    exists (
      select 1
      from public.ventas_agromercado_pendientes v
      where v.agromercado = p_agromercado
        and v.estado = 'pendiente'
    ) as pendiente,
    (
      select v.fecha
      from public.ventas_agromercado_pendientes v
      where v.agromercado = p_agromercado
        and v.estado = 'pendiente'
      order by v.creado_en desc
      limit 1
    ) as fecha,
    (
      select v.creado_en
      from public.ventas_agromercado_pendientes v
      where v.agromercado = p_agromercado
        and v.estado = 'pendiente'
      order by v.creado_en desc
      limit 1
    ) as creado_en;
$$;

grant execute on function public.portal_agromercado_pendiente(text) to anon, authenticated;
