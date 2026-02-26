import { TestBed } from '@angular/core/testing';
import { UtilService } from './util.service';

describe('UtilService', () => {
	let service: UtilService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(UtilService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('getLanguageColor', () => {
		it('should return color for known languages', () => {
			expect(service.getLanguageColor('JavaScript')).toBe('#f1e05a');
			expect(service.getLanguageColor('TypeScript')).toBe('#2b7489');
			expect(service.getLanguageColor('Python')).toBe('#3572A5');
			expect(service.getLanguageColor('Java')).toBe('#b07219');
			expect(service.getLanguageColor('C++')).toBe('#f34b7d');
			expect(service.getLanguageColor('C#')).toBe('#178600');
			expect(service.getLanguageColor('PHP')).toBe('#4F5D95');
			expect(service.getLanguageColor('Ruby')).toBe('#701516');
			expect(service.getLanguageColor('CSS')).toBe('#563d7c');
			expect(service.getLanguageColor('HTML')).toBe('#e34c26');
			expect(service.getLanguageColor('Batchfile')).toBe('#89e051');
			expect(service.getLanguageColor('PLpgSQL')).toBe('#336791');
		});

		it('should return default color for unknown language', () => {
			expect(service.getLanguageColor('UnknownLang')).toBe('#ccc');
			expect(service.getLanguageColor('')).toBe('#ccc');
			expect(service.getLanguageColor(undefined as any)).toBe('#ccc');
		});
	});

	describe('getTechColor', () => {
		it('should return color for known techs', () => {
			expect(service.getTechColor('Vue')).toBe('#2c3e50');
			expect(service.getTechColor('React')).toBe('#61dafb');
			expect(service.getTechColor('Angular')).toBe('#dd0031');
		});

		it('should return default color for unknown tech', () => {
			expect(service.getTechColor('UnknownTech')).toBe('#ccc');
			expect(service.getTechColor('')).toBe('#ccc');
			expect(service.getTechColor(undefined as any)).toBe('#ccc');
		});
	});

	describe('formatDate', () => {
		it('should format valid date string to locale format', () => {
			const result = service.formatDate('2023-05-15T10:30:00Z');
			expect(result).toMatch(/15 may\.? 2023|15 de mayo de 2023/i);
		});

		it('should handle invalid date gracefully', () => {
			const result = service.formatDate('invalid-date');
			expect(result).toBe('Invalid Date');
		});
	});
});