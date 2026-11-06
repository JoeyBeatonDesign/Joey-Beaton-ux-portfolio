// Case study order, used for Previous / Next project. The first and last wrap round.
export const projects = [
  { href: '/library/', name: 'Library' },
  { href: '/bath-with-kids/', name: 'Bath with Kids' },
  { href: '/billsmart/', name: 'BillSmart' },
  { href: '/pulse/', name: 'Pulse' },
];

export function neighbours(path: string) {
  const clean = path.endsWith('/') ? path : path + '/';
  const i = projects.findIndex((p) => p.href === clean);
  if (i < 0) return null;
  const n = projects.length;
  return { prev: projects[(i + n - 1) % n], next: projects[(i + 1) % n] };
}
