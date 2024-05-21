const config = {
	BASE_URL: String(import.meta.env.VITE_BASE_URL),
	STRIPE_PUBLISHABLE_KEY: String(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY),
};

export default config;
