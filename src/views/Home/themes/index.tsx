import { useState } from 'react'
import { useThemeStore } from '@/store/themeStore'
import { 
  Card, 
  Button, 
  Alert, 
  Tag, 
  Input,
  Badge,
  Avatar,
  Tabs 
} from '@/components/ui'
import { 
  HiOutlineColorSwatch, 
  HiCheck, 
  HiOutlineDocument, 
  HiOutlinePhotograph,
  HiOutlineCube
} from 'react-icons/hi'

// Sample data for demonstrating text content in different themes
const sampleMedicalTerms = {
  default: ['Vaccination', 'General Checkup', 'Primary Care', 'Preventive Medicine'],
  organTransplant: ['Kidney Transplant', 'Organ Donation', 'Immunosuppression', 'Tissue Matching'],
  cosmeticSurgery: ['Rhinoplasty', 'Botox', 'Liposuction', 'Facial Rejuvenation']
}

// Theme configuration details
const themeConfig = {
  default: {
    name: 'Default Medical Theme',
    description: 'Professional theme for general healthcare services',
    primaryColor: '#1976d2',
    secondaryColor: '#90caf9',
    accentColor: '#4dabf5',
    fontFamily: 'Roboto, Arial, sans-serif',
    borderRadius: '0.25rem',
    example: 'A standard medical interface with clear navigation and readable text.',
    bgClass: 'bg-primary',
    textClass: 'text-primary',
    borderClass: 'border-primary',
    hoverClass: 'hover:bg-primary-deep',
  },
  organTransplant: {
    name: 'Organ Transplant Theme',
    description: 'Specialized theme for transplantation services',
    primaryColor: '#006064',
    secondaryColor: '#4dd0e1',
    accentColor: '#00acc1',
    fontFamily: 'Merriweather, Georgia, serif',
    borderRadius: '0.25rem',
    example: 'Focus on medical data presentation with clear hierarchy for critical information.',
    bgClass: 'bg-teal-700',
    textClass: 'text-teal-700',
    borderClass: 'border-teal-700',
    hoverClass: 'hover:bg-teal-800',
  },
  cosmeticSurgery: {
    name: 'Cosmetic Surgery Theme',
    description: 'Elegant theme for aesthetic medicine',
    primaryColor: '#ad1457',
    secondaryColor: '#f48fb1',
    accentColor: '#ec407a',
    fontFamily: 'Playfair Display, Georgia, serif',
    borderRadius: '0.75rem',
    example: 'Sophisticated design with refined typography and visually engaging elements.',
    bgClass: 'bg-pink-700',
    textClass: 'text-pink-700',
    borderClass: 'border-pink-700',
    hoverClass: 'hover:bg-pink-800',
  }
}

/**
 * Theme preview card component
 */
const ThemePreviewCard = ({ 
  themeKey, 
  active, 
  onSelect 
}: { 
  themeKey: string; 
  active: boolean; 
  onSelect: () => void;
}) => {
  // Get theme config based on theme key
  const theme = themeConfig[themeKey as keyof typeof themeConfig]
  
  return (
    <Card 
      className={`theme-card transition-all hover:shadow-lg ${active ? 'ring-2 ring-offset-2 ' + theme.borderClass : ''}`}
      headerClass={theme.bgClass + ' text-white'}
      header={
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-medium">{theme.name}</h4>
          {active && <Badge className="bg-white text-gray-700" content="Active" />}
        </div>
      }
      footer={
        <div className="flex justify-between items-center">
          <Button
            size="sm"
            variant={active ? "solid" : "twoTone"} 
            className={active ? 'bg-gray-200 text-gray-600 cursor-default' : ''}
            icon={active ? <HiCheck /> : <HiOutlineColorSwatch />}
            onClick={onSelect}
            disabled={active}
          >
            {active ? 'Current Theme' : 'Apply Theme'}
          </Button>
          
          <div className="flex gap-2">
            <div className="h-5 w-5 rounded-full" style={{ backgroundColor: theme.primaryColor }}></div>
            <div className="h-5 w-5 rounded-full" style={{ backgroundColor: theme.secondaryColor }}></div>
            <div className="h-5 w-5 rounded-full" style={{ backgroundColor: theme.accentColor }}></div>
          </div>
        </div>
      }
    >
      <div className="p-4">
        <p className="mb-3 text-gray-600">{theme.description}</p>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="text-sm">
            <span className="font-bold block">Primary Color</span>
            <span style={{ color: theme.primaryColor }}>{theme.primaryColor}</span>
          </div>
          <div className="text-sm">
            <span className="font-bold block">Font</span>
            <span>{theme.fontFamily.split(',')[0]}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <div 
            className={`p-3 rounded-md mb-3 text-white ${theme.bgClass}`}
          >
            Sample Header
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {sampleMedicalTerms[themeKey as keyof typeof sampleMedicalTerms].map((term, index) => (
              <Tag 
                key={index} 
                className={active ? theme.bgClass + ' text-white' : 'bg-gray-100'}
              >
                {term}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}

/**
 * Component preview section - shows how UI components look with the selected theme
 */
const ComponentPreviews = ({ activeTheme }: { activeTheme: string }) => {
  const theme = themeConfig[activeTheme as keyof typeof themeConfig]
  const [activeTab, setActiveTab] = useState('buttons')
  
  const tabList = [
    { key: 'buttons', label: 'Buttons', icon: <HiOutlineCube /> },
    { key: 'alerts', label: 'Alerts', icon: <HiOutlineDocument /> },
    { key: 'forms', label: 'Forms', icon: <HiOutlinePhotograph /> },
  ]
  
  return (
    <Card
      header={<h4 className="text-lg">Component Preview with {theme.name}</h4>}
      headerClass={theme.bgClass + ' text-white'}
    >
      <div className="p-4">
        <Tabs value={activeTab} onChange={(val) => setActiveTab(val as string)}>
          {tabList.map((tab) => (
            <Tabs.TabNav key={tab.key} value={tab.key} icon={tab.icon}>
              {tab.label}
            </Tabs.TabNav>
          ))}
        </Tabs>
        
        <div className="mt-4 p-4 border rounded-lg">
          {activeTab === 'buttons' && (
            <div className="space-y-4">
              <h5 className="font-medium mb-3">Buttons</h5>
              <div className="flex flex-wrap gap-2">
                <Button className={theme.bgClass + ' text-white'}>Primary Button</Button>
                <Button variant="twoTone">Secondary Button</Button>
                <Button variant="plain" className={theme.textClass}>Text Button</Button>
                <Button size="sm" className={theme.bgClass + ' text-white'}>Small Button</Button>
                <Button icon={<HiOutlineColorSwatch />} className={theme.bgClass + ' text-white'}>
                  With Icon
                </Button>
              </div>
            </div>
          )}
          
          {activeTab === 'alerts' && (
            <div className="space-y-4">
              <h5 className="font-medium mb-3">Alerts & Notifications</h5>
              <Alert type="info" showIcon title="Information" className="mb-4">
                This is an information message.
              </Alert>
              <Alert type="success" showIcon title="Success" className="mb-4">
                Operation completed successfully.
              </Alert>
              <Alert type="warning" showIcon title="Warning" className="mb-4">
                Please review before proceeding.
              </Alert>
              <Alert type="danger" showIcon title="Error" className="mb-4">
                An error has occurred.
              </Alert>
            </div>
          )}
          
          {activeTab === 'forms' && (
            <div className="space-y-4">
              <h5 className="font-medium mb-3">Form Elements</h5>
              <div className="mb-4">
                <label className="block mb-2">Input Field</label>
                <Input placeholder="Enter text here" />
              </div>
              <div className="mb-4">
                <label className="block mb-2">With Label</label>
                <Input 
                  prefix={<HiOutlineDocument className={theme.textClass} />} 
                  placeholder="Search documents"
                />
              </div>
              <div className="flex gap-4 items-center mb-4">
                <Avatar shape="circle" size={40} className={theme.bgClass}>
                  {activeTheme.substring(0, 2).toUpperCase()}
                </Avatar>
                <div>
                  <div className="font-bold">User Profile</div>
                  <div className="text-sm text-gray-500">Medical Staff</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

/**
 * Typography showcase component
 */
const TypographyShowcase = ({ activeTheme }: { activeTheme: string }) => {
  const theme = themeConfig[activeTheme as keyof typeof themeConfig]
  
  const headingStyle = { fontFamily: theme.fontFamily.split(',')[0] }
  const textStyle = { fontFamily: theme.fontFamily }
  
  return (
    <Card 
      header={<h4 className="text-lg">Typography & Text Examples</h4>}
      headerClass={theme.bgClass + ' text-white'}
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2" style={headingStyle}>Main Heading</h2>
        <h3 className="text-xl font-semibold mb-4" style={headingStyle}>Subheading</h3>
        
        <p className="mb-4" style={textStyle}>
          This paragraph demonstrates the default text styling for the {theme.name}.
          Notice how the font family, size, and spacing all contribute to the overall theme experience.
        </p>
        
        <div className="mb-4 p-3 border rounded" style={textStyle}>
          <strong className={theme.textClass}>Important:</strong> This callout box highlights 
          {activeTheme === 'default' && ' general medical information that may be relevant to patients.'}
          {activeTheme === 'organTransplant' && ' critical information about organ donation and transplant procedures.'}
          {activeTheme === 'cosmeticSurgery' && ' considerations for patients seeking cosmetic procedures.'}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2" style={headingStyle}>List Example</h4>
            <ul className="list-disc list-inside space-y-1" style={textStyle}>
              {sampleMedicalTerms[activeTheme as keyof typeof sampleMedicalTerms].map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2" style={headingStyle}>Text Formatting</h4>
            <p style={textStyle}>
              <span className="font-bold">Bold text</span>, 
              <span className="italic ml-1">italic text</span>, 
              <span className={`ml-1 ${theme.textClass}`}>colored text</span>, and
              <span className="ml-1 underline">underlined text</span>.
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}

/**
 * Main Themes Page Component
 */
const ThemesPage = () => {
  // Get theme state and setter from store
  const specialty = useThemeStore((state) => state.specialty)
  const setSpecialty = useThemeStore((state) => state.setSpecialty)
  
  // Handle theme selection
  const handleSelectTheme = (themeKey: string) => {
    setSpecialty(themeKey as 'default' | 'organTransplant' | 'cosmeticSurgery')
  }
  
  const themeKeys = ['default', 'organTransplant', 'cosmeticSurgery']
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Medical Specialty Themes</h1>
        <p className="text-gray-600">
          Select a theme to customize the appearance of the medical platform based on your specialty.
          Each theme provides a unique visual experience optimized for different medical contexts.
        </p>
      </div>
      
      {/* Theme Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {themeKeys.map((themeKey) => (
          <ThemePreviewCard
            key={themeKey}
            themeKey={themeKey}
            active={specialty === themeKey}
            onSelect={() => handleSelectTheme(themeKey)}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Component Previews */}
        <ComponentPreviews activeTheme={specialty} />
        
        {/* Typography Examples */}
        <TypographyShowcase activeTheme={specialty} />
      </div>
    </div>
  )
}

export default ThemesPage