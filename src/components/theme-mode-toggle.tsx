'use client';

import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeModeToggle() {
	const { setTheme, theme } = useTheme();

	// false -> light
	// true -> dark
	const [modeValue, setModeValue] = useState(false);

	function handleToggleMode() {
		if (theme === 'light') {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	}

	return (
		<div className="flex items-center gap-2">
			<Switch onCheckedChange={handleToggleMode} />
			<span className="text-sm">Modo escuro</span>
		</div>
	);
}
