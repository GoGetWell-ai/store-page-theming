const baseColors = {
    light: {
        neutral: '#ffffff',
        primary: '#6355D9', // Original purple
        primaryDeep: '#4C3EBF',
        primaryMild: '#9B92E8',
        primarySubtle: '#EFEDF9',
        secondary: '#4CAF50', // Green
        secondaryDeep: '#2E7D32',
        secondaryMild: '#81C784',
        accent: '#00bcd4',
        background: '#f5f5f5',
        text: '#333333',
        heading: '#212121',
        headerBg: 'from-[#4C3EBF] to-[#6355D9]',
        buttonGradient: 'from-[#6355D9] to-[#4C3EBF]',
        cardBorder: 'border-purple-100',
        cardHover: 'hover:border-purple-300',
        iconBg: 'bg-[#EFEDF9]',
        iconColor: 'text-primary',
        stepActiveBg: 'bg-primary',
        stepInactiveBg: 'bg-[#e5e2f1]',
        heroOverlay: 'from-[#4C3EBF]/70 to-[#000000]/50',
        accentText:
            'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400',
    },
    dark: {
        neutral: '#121212',
        primary: '#7D70E7', // Brightened purple
        primaryDeep: '#5E51CE',
        primaryMild: '#ADA5ED',
        primarySubtle: '#2A2750',
        secondary: '#66BB6A', // Brightened green
        secondaryDeep: '#43A047',
        secondaryMild: '#98D99D',
        accent: '#26c6da',
        background: '#1E1E1E',
        text: '#E0E0E0',
        heading: '#FFFFFF',
        headerBg: 'from-[#5E51CE] to-[#7D70E7]',
        buttonGradient: 'from-[#7D70E7] to-[#5E51CE]',
        cardBorder: 'border-purple-800',
        cardHover: 'hover:border-purple-600',
        iconBg: 'bg-[#2A2750]',
        iconColor: 'text-primary',
        stepActiveBg: 'bg-primary',
        stepInactiveBg: 'bg-[#2A2750]',
        heroOverlay: 'from-[#5E51CE]/80 to-[#000000]/70',
        accentText:
            'text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300',
    },
}

export default baseColors
