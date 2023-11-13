"use client"

import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'

type Props = {}

export default function ThemeSwitcher({}: Props) {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const [ selectedTheme, setSelectedTheme ] = useState(theme);
  
    useEffect(()=>{
        setMounted(true);
    },[]);

    if(!mounted) {
        return null;
    }

    const onChangeTheme = () => {
        if(selectedTheme == "light") {
            setSelectedTheme("dark");
            setTheme("dark");
        } else {
            setSelectedTheme("light");
            setTheme("light");
        }

    }
    return (<>
        <Button variant={"dropicon"} size={"dropicon"} onClick={onChangeTheme} className={``}>Switch Appearance</Button>
        </>
  )
}