-- Reinicio completo de datos de prueba EXCOMERCAFE.
-- Ejecutar en Supabase SQL Editor si tambien quieres limpiar la nube.
-- No borra usuarios de Authentication.

do $$
declare
  t text;
  tablas text[] := array[
    'presence_online',
    'chat_messages',
    'estado_cuadres',
    'ventas_agromercado',
    'inventario_movimientos',
    'distribucion_tiendona',
    'distribucion_cda',
    'backup_logs',
    'backups'
  ];
begin
  foreach t in array tablas loop
    if to_regclass('public.' || t) is not null then
      execute format('truncate table public.%I restart identity cascade', t);
    end if;
  end loop;
end $$;
