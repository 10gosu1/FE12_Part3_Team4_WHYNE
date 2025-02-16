import type { Config } from "tailwindcss";
import tailwindScrollbarHide from "tailwind-scrollbar-hide";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			black: '#101318',
  			white: '#ffffff',
  			gray: {
  				'100': '#f2f4f8',
  				'300': '#cfdbea',
  				'500': '#9facbd',
  				'800': '#2d3034'
  			},
  			purple: {
  				'10': '#f1edfc',
  				'100': '#6a42db'
  			}
  		},
  		fontSize: {
  			base: '16px',
  			'3xl-32px-bold': [
  				'2rem',
  				{
  					lineHeight: '2.625rem',
  					fontWeight: '700'
  				}
  			],
  			'3xl-32px-semibold': [
  				'2rem',
  				{
  					lineHeight: '2.625rem',
  					fontWeight: '600'
  				}
  			],
  			'2xl-24px-bold': [
  				'1.5rem',
  				{
  					lineHeight: '2rem',
  					fontWeight: '700'
  				}
  			],
  			'2xl-24px-semibold': [
  				'1.5rem',
  				{
  					lineHeight: '2rem',
  					fontWeight: '600'
  				}
  			],
  			'2xl-24px-medium': [
  				'1.5rem',
  				{
  					lineHeight: '2rem',
  					fontWeight: '500'
  				}
  			],
  			'2xl-24px-regular': [
  				'1.5rem',
  				{
  					lineHeight: '2rem',
  					fontWeight: '400'
  				}
  			],
  			'xl-20px-bold': [
  				'1.25rem',
  				{
  					lineHeight: '2rem',
  					fontWeight: '700'
  				}
  			],
  			'xl-20px-semibold': [
  				'1.25rem',
  				{
  					lineHeight: '2rem',
  					fontWeight: '600'
  				}
  			],
  			'xl-20px-medium': [
  				'1.25rem',
  				{
  					lineHeight: '2rem',
  					fontWeight: '500'
  				}
  			],
  			'xl-20px-regular': [
  				'1.25rem',
  				{
  					lineHeight: '2rem',
  					fontWeight: '400'
  				}
  			],
  			'2lg-18px-bold': [
  				'1.125rem',
  				{
  					lineHeight: '1.625rem',
  					fontWeight: '700'
  				}
  			],
  			'2lg-18px-semibold': [
  				'1.125rem',
  				{
  					lineHeight: '1.625rem',
  					fontWeight: '600'
  				}
  			],
  			'2lg-18px-medium': [
  				'1.125rem',
  				{
  					lineHeight: '1.625rem',
  					fontWeight: '500'
  				}
  			],
  			'2lg-18px-regular': [
  				'1.125rem',
  				{
  					lineHeight: '1.625rem',
  					fontWeight: '400'
  				}
  			],
  			'lg-16px-bold': [
  				'1rem',
  				{
  					lineHeight: '1.625rem',
  					fontWeight: '700'
  				}
  			],
  			'lg-16px-semibold': [
  				'1rem',
  				{
  					lineHeight: '1.625rem',
  					fontWeight: '600'
  				}
  			],
  			'lg-16px-medium': [
  				'1rem',
  				{
  					lineHeight: '1.625rem',
  					fontWeight: '500'
  				}
  			],
  			'lg-16px-regular': [
  				'1rem',
  				{
  					lineHeight: '1.625rem',
  					fontWeight: '400'
  				}
  			],
  			'md-14px-bold': [
  				'0.875rem',
  				{
  					lineHeight: '1.5rem',
  					fontWeight: '700'
  				}
  			],
  			'md-14px-semibold': [
  				'0.875rem',
  				{
  					lineHeight: '1.5rem',
  					fontWeight: '600'
  				}
  			],
  			'md-14px-medium': [
  				'0.875rem',
  				{
  					lineHeight: '1.5rem',
  					fontWeight: '500'
  				}
  			],
  			'md-14px-regular': [
  				'0.875rem',
  				{
  					lineHeight: '1.5rem',
  					fontWeight: '400'
  				}
  			],
  			'sm-13px-semibold': [
  				'0.8125rem',
  				{
  					lineHeight: '1.375rem',
  					fontWeight: '600'
  				}
  			],
  			'sm-13px-medium': [
  				'0.8125rem',
  				{
  					lineHeight: '1.375rem',
  					fontWeight: '500'
  				}
  			],
  			'xs-12px-semibold': [
  				'0.75rem',
  				{
  					lineHeight: '1.25rem',
  					fontWeight: '600'
  				}
  			],
  			'xs-12px-medium': [
  				'0.75rem',
  				{
  					lineHeight: '1.125rem',
  					fontWeight: '500'
  				}
  			],
  			'xs-12px-regular': [
  				'0.75rem',
  				{
  					lineHeight: '1.125rem',
  					fontWeight: '400'
  				}
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	},
  	plugins: [
  		'tailwindScrollbarHide'
  	]
  },
    plugins: [require("tailwindcss-animate")]
} satisfies Config;
