import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-24 text-center">
      <div className="max-w-md">
        <span className="font-serif text-8xl text-cafe-medio font-semibold block mb-4">
          404
        </span>
        <h1 className="font-serif text-3xl text-cafe-oscuro mb-3">
          Taza No Encontrada
        </h1>
        <p className="text-sm text-cafe-oscuro/70 font-sans mb-8 leading-relaxed">
          Parece que el grano que buscas no fue tostado o la página cambió de lugar. Regresa a nuestra selección de café de autor.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-cafe-oscuro text-blanco text-xs uppercase font-semibold tracking-wider rounded-xs hover:bg-cafe-medio transition-colors"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
