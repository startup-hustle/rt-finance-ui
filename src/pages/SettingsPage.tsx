import  { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { ChevronDown, ChevronRight, Plus, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SettingsPage = () => {
    // State to manage expanded settings and form data
    const [expandedSetting, setExpandedSetting] = useState(null);
    const [billForm, setBillForm] = useState({ name: '', amount: '' });
    const [emiForm, setEmiForm] = useState({ name: '', amount: '' });
    const [otherMonthlyCommitmentsForm, setOtherMonthlyCommitmentsForm] = useState({ name: '', amount: '' });

    // Handler to toggle settings expansion
    const handleSettingToggle = (setting) => {
        setExpandedSetting(expandedSetting === setting ? null : setting);
    };

    // Prevent closing when interacting with form
    const handleFormInteraction = (e) => {
        e.stopPropagation();
    };

    // Generic form submission handler
    const handleSubmit = async (type, formData) => {
        try {
            const response = await fetch(`/api/${type.toLowerCase().replace(/\s+/g, '-')}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Submission failed');
            }

            // Reset form after successful submission
            switch(type) {
                case 'Bills':
                    setBillForm({ name: '', amount: '' });
                    break;
                case 'EMIs':
                    setEmiForm({ name: '', amount: '' });
                    break;
                case 'Other Monthly Commitments':
                    setOtherMonthlyCommitmentsForm({ name: '', amount: '' });
                    break;
            }

            alert(`${type} saved successfully!`);
        } catch (error) {
            console.error(`Error saving ${type}:`, error);
            alert(`Failed to save ${type}`);
        }
    };

    // Render form for each setting type
    const renderSettingForm = (type) => {
        let form, formData, setFormData;

        switch(type) {
            case 'Bills':
                form = billForm;
                setFormData = setBillForm;
                break;
            case 'EMIs':
                form = emiForm;
                setFormData = setEmiForm;
                break;
            case 'Other Monthly Commitments':
                form = otherMonthlyCommitmentsForm;
                setFormData = setOtherMonthlyCommitmentsForm;
                break;
        }

        return (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 mt-4 overflow-hidden"
                onClick={handleFormInteraction}
            >
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor={`${type.toLowerCase().replace(/\s+/g, '-')}-name`} className="text-gray-200">{type} Name</Label>
                    <Input
                        type="text"
                        id={`${type.toLowerCase().replace(/\s+/g, '-')}-name`}
                        value={form.name}
                        onChange={(e) => setFormData({...form, name: e.target.value})}
                        placeholder={`Enter ${type} Name`}
                        className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
                        onClick={handleFormInteraction}
                    />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor={`${type.toLowerCase().replace(/\s+/g, '-')}-amount`} className="text-gray-200">Amount</Label>
                    <Input
                        type="number"
                        id={`${type.toLowerCase().replace(/\s+/g, '-')}-amount`}
                        value={form.amount}
                        onChange={(e) => setFormData({...form, amount: e.target.value})}
                        placeholder={`Enter ${type} Amount`}
                        className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
                        onClick={handleFormInteraction}
                    />
                </div>
                <Button
                    onClick={() => handleSubmit(type, form)}
                    disabled={!form.name || !form.amount}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                >
                    <Save className="w-4 h-4" />
                    Save {type}
                </Button>
            </motion.div>
        );
    };

    // Settings configuration
    const settingsList = [
        'Bills',
        'EMIs',
        'Other Monthly Commitments'
    ];

    return (
        <div className="container mx-auto p-4 bg-gray-900 min-h-screen">
            <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                    <CardTitle className="text-gray-100 flex items-center">
                        <Plus className="mr-2 text-blue-400" />
                        Financial Settings
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {settingsList.map((setting) => (
                            <motion.div
                                key={setting}
                                className="border border-gray-700 rounded-lg p-3 cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors"
                                onClick={() => handleSettingToggle(setting)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex justify-between items-center">
                  <span className="text-gray-100 flex items-center">
                    {expandedSetting === setting
                        ? <ChevronDown className="mr-2 text-blue-400" />
                        : <ChevronRight className="mr-2 text-blue-400" />}
                      {setting}
                  </span>
                                </div>
                                <AnimatePresence>
                                    {expandedSetting === setting && renderSettingForm(setting)}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SettingsPage;