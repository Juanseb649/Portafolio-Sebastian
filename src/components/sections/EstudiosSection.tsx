import React from 'react';

const EstudiosSection: React.FC = () => {
	return (
		<section id="estudios" className="py-20 bg-gray-50">
			<div className="container mx-auto px-4 max-w-6xl">
				<h2 className="text-3xl font-bold text-gray-900 mb-6">Estudios y Certificados</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="bg-white p-6 rounded-lg shadow-sm">
						<h3 className="text-xl font-semibold text-gray-800 mb-3">Formación Académica</h3>
						<div className="space-y-3 text-gray-700">
							<div>
								<p className="font-medium">Ingeniería de Software</p>
								<p className="text-sm">Universidad Cooperativa de Colombia — Junio 2024</p>
							</div>
						</div>
					</div>

					<div className="bg-white p-6 rounded-lg shadow-sm">
						<h3 className="text-xl font-semibold text-gray-800 mb-3">Certificados</h3>
						<ul className="list-disc pl-5 space-y-1 text-gray-700">
							<li>Google Cloud Computing Foundations Certificate — Google</li>
							<li>EF SET English Certificate (B2 Upper Intermediate)</li>
							<li>Fundamentos Esenciales de la Programación — LinkedIn</li>
							<li>Machine Learning: Ejemplos prácticos — IBM</li>
							<li>MIPG: Auditoría y Fundamentos Generales — Departamento Administrativo de la Función Pública</li>
							<li>Mandated Reporter Training — Connecticut State Department of Children & Families</li>
						</ul>
					</div>
				</div>

				<div className="mt-8 flex items-center gap-4">
					<a href="/CV_Juan_Sebastian_Ibarra_Salas.pdf" download className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700">
						Descargar CV
					</a>
					<a href="/CV_Juan_Sebastian_Ibarra_Salas.pdf" target="_blank" rel="noreferrer" className="text-sm text-gray-600 hover:underline">
						Ver CV (abrir en nueva pestaña)
					</a>
				</div>
			</div>
		</section>
	);
};

export default EstudiosSection;
