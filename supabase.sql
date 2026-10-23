-- Ranking de "Atrapa el topo" · pega TODO esto en Supabase → SQL Editor → Run

create table public.scores (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name       text not null check (char_length(btrim(name)) between 1 and 12),
  mode       text not null check (mode in ('facil','normal','dificil')),
  score      int  not null check (score between 1 and 100000),
  harvested  int  not null default 0 check (harvested between 0 and 1000),
  wave       int  not null default 1 check (wave between 1 and 200),
  elapsed    int  not null check (elapsed between 1 and 36000),
  reason     text not null default 'quit' check (reason in ('win','razed','quit')),
  multi      boolean not null default false,
  -- puntuaciones imposibles (más puntos de los que cabe en el tiempo jugado) se rechazan
  constraint plausible check (score <= 30 + elapsed * 15)
);

create index scores_rank_idx on public.scores (mode, score desc, created_at);

-- Freno anti-spam: como mucho 1 partida cada 8 segundos por nombre
create function public.scores_throttle() returns trigger language plpgsql as $$
begin
  if exists (select 1 from public.scores
             where lower(name) = lower(new.name) and created_at > now() - interval '8 seconds') then
    raise exception 'demasiado rápido';
  end if;
  return new;
end $$;
create trigger scores_throttle_t before insert on public.scores
  for each row execute function public.scores_throttle();

-- Permisos: todo el mundo puede LEER e INSERTAR; nadie puede modificar ni borrar desde el juego
alter table public.scores enable row level security;
create policy "leer ranking"   on public.scores for select to anon using (true);
create policy "subir partida"  on public.scores for insert to anon with check (true);
