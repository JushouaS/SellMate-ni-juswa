import React, { useState } from 'react';
import { NavBar } from "@/components/NavBar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, ArrowLeft, Check, Plus, Trash2, Edit, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface PaymentAccount {
  id: string;
  methodId: string;
  accountName: string;
  accountNumber: string;
  isDefault: boolean;
}

const PaymentMethodsPage = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<PaymentAccount[]>([
    { id: '1', methodId: 'gcash', accountName: 'Personal GCash', accountNumber: '09123456789', isDefault: true },
    { id: '2', methodId: 'maya', accountName: 'Maya Account', accountNumber: '09876543210', isDefault: false },
  ]);
  const [newAccount, setNewAccount] = useState({
    accountName: '',
    accountNumber: '',
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'gcash',
      name: 'GCash',
      icon: '/lovable-uploads/e0f77b0f-875e-4f04-9508-7fd4610e69cf.png',
      description: 'Connect your GCash account for secure transactions with middlemen'
    },
    {
      id: 'maya',
      name: 'Maya',
      icon: '/lovable-uploads/e0f77b0f-875e-4f04-9508-7fd4610e69cf.png',
      description: 'Use Maya for fast and reliable payments with middlemen'
    },
    {
      id: 'credit-card',
      name: 'Credit Card',
      icon: '/lovable-uploads/e0f77b0f-875e-4f04-9508-7fd4610e69cf.png',
      description: 'Add your credit or debit card for convenient transactions'
    },
    {
      id: 'bank-transfer',
      name: 'Bank Transfer',
      icon: '/lovable-uploads/e0f77b0f-875e-4f04-9508-7fd4610e69cf.png',
      description: 'Set up bank transfer for direct payments to middlemen'
    }
  ];

  const handleGoBack = () => {
    navigate('/dashboard/buyer');
  };

  const handleSelectMethod = (methodId: string) => {
    setSelectedMethod(methodId);
  };

  const handleAddAccount = () => {
    if (!selectedMethod || !newAccount.accountName || !newAccount.accountNumber) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newAccountObj: PaymentAccount = {
      id: Date.now().toString(),
      methodId: selectedMethod,
      accountName: newAccount.accountName,
      accountNumber: newAccount.accountNumber,
      isDefault: accounts.length === 0 || accounts.filter(a => a.methodId === selectedMethod).length === 0,
    };

    setAccounts([...accounts, newAccountObj]);
    setNewAccount({ accountName: '', accountNumber: '' });
    setDialogOpen(false);
    
    toast({
      title: "Account added",
      description: `Your ${paymentMethods.find(m => m.id === selectedMethod)?.name} account has been successfully added.`,
      variant: "default",
    });
  };

  const handleSetDefault = (accountId: string) => {
    const updatedAccounts = accounts.map(account => ({
      ...account,
      isDefault: account.id === accountId,
    }));
    setAccounts(updatedAccounts);
    
    toast({
      title: "Default account updated",
      description: "Your default payment account has been updated successfully.",
      variant: "default",
    });
  };

  const handleDeleteAccount = (accountId: string) => {
    const updatedAccounts = accounts.filter(account => account.id !== accountId);
    setAccounts(updatedAccounts);
    
    toast({
      title: "Account removed",
      description: "The payment account has been removed successfully.",
      variant: "default",
    });
  };

  const filteredAccounts = selectedMethod ? accounts.filter(account => account.methodId === selectedMethod) : accounts;

  return (
    <div className="page-container">
      <NavBar userType="buyer" />
      <main className="flex-1 bg-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={handleGoBack} className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
            </Button>
            <h1 className="text-3xl font-bold">Payment Methods</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-blue-100">Sellmate</p>
                    <h3 className="text-2xl font-bold mt-1">Payment Setup</h3>
                    <p className="text-sm text-blue-100 mt-2">
                      Configure your payment methods to easily transact with middlemen
                    </p>
                    <div className="mt-4">
                      <Button variant="secondary" size="sm" className="bg-white text-blue-600 hover:bg-blue-50">
                        Learn More
                      </Button>
                    </div>
                  </div>
                  <div className="bg-blue-400 bg-opacity-30 p-3 rounded-full">
                    <CreditCard className="h-8 w-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8 border-2 border-blue-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
              <CardTitle>Select Your Preferred Payment Method</CardTitle>
              <CardDescription>
                Choose from our available payment options to transact with middlemen
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-6 bg-blue-100">
                  <TabsTrigger value="all" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">All Methods</TabsTrigger>
                  <TabsTrigger value="e-wallet" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">E-Wallet</TabsTrigger>
                  <TabsTrigger value="cards" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">Cards</TabsTrigger>
                  <TabsTrigger value="banks" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">Banks</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {paymentMethods.map((method) => (
                      <Card 
                        key={method.id}
                        className={`cursor-pointer transition-all hover:shadow-lg transform hover:-translate-y-1 
                        ${selectedMethod === method.id ? 'border-blue-500 ring-2 ring-blue-300 shadow-md' : 'hover:border-blue-300'}`}
                        onClick={() => handleSelectMethod(method.id)}
                      >
                        <div className="p-6 flex flex-col items-center text-center gap-4">
                          <div className="relative">
                            <CreditCard className="h-12 w-12 text-blue-500" />
                            {selectedMethod === method.id && (
                              <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1">
                                <Check className="h-3 w-3" />
                              </div>
                            )}
                          </div>
                          <h2 className="text-xl font-semibold">{method.name}</h2>
                          <p className="text-gray-600 text-sm">{method.description}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="e-wallet" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paymentMethods.filter(m => ['gcash', 'maya'].includes(m.id)).map((method) => (
                      <Card 
                        key={method.id}
                        className={`cursor-pointer transition-all hover:shadow-lg transform hover:-translate-y-1 
                        ${selectedMethod === method.id ? 'border-blue-500 ring-2 ring-blue-300 shadow-md' : 'hover:border-blue-300'}`}
                        onClick={() => handleSelectMethod(method.id)}
                      >
                        <div className="p-6 flex flex-col items-center text-center gap-4">
                          <div className="relative">
                            <CreditCard className="h-12 w-12 text-blue-500" />
                            {selectedMethod === method.id && (
                              <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1">
                                <Check className="h-3 w-3" />
                              </div>
                            )}
                          </div>
                          <h2 className="text-xl font-semibold">{method.name}</h2>
                          <p className="text-gray-600 text-sm">{method.description}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="cards" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paymentMethods.filter(m => ['credit-card'].includes(m.id)).map((method) => (
                      <Card 
                        key={method.id}
                        className={`cursor-pointer transition-all hover:shadow-lg transform hover:-translate-y-1 
                        ${selectedMethod === method.id ? 'border-blue-500 ring-2 ring-blue-300 shadow-md' : 'hover:border-blue-300'}`}
                        onClick={() => handleSelectMethod(method.id)}
                      >
                        <div className="p-6 flex flex-col items-center text-center gap-4">
                          <div className="relative">
                            <CreditCard className="h-12 w-12 text-blue-500" />
                            {selectedMethod === method.id && (
                              <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1">
                                <Check className="h-3 w-3" />
                              </div>
                            )}
                          </div>
                          <h2 className="text-xl font-semibold">{method.name}</h2>
                          <p className="text-gray-600 text-sm">{method.description}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="banks" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paymentMethods.filter(m => ['bank-transfer'].includes(m.id)).map((method) => (
                      <Card 
                        key={method.id}
                        className={`cursor-pointer transition-all hover:shadow-lg transform hover:-translate-y-1 
                        ${selectedMethod === method.id ? 'border-blue-500 ring-2 ring-blue-300 shadow-md' : 'hover:border-blue-300'}`}
                        onClick={() => handleSelectMethod(method.id)}
                      >
                        <div className="p-6 flex flex-col items-center text-center gap-4">
                          <div className="relative">
                            <CreditCard className="h-12 w-12 text-blue-500" />
                            {selectedMethod === method.id && (
                              <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1">
                                <Check className="h-3 w-3" />
                              </div>
                            )}
                          </div>
                          <h2 className="text-xl font-semibold">{method.name}</h2>
                          <p className="text-gray-600 text-sm">{method.description}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {selectedMethod && (
            <Card className="border-2 border-blue-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
                <CardTitle>Manage Your {paymentMethods.find(m => m.id === selectedMethod)?.name} Accounts</CardTitle>
                <CardDescription>
                  Add, remove, or set your default account for transactions with middlemen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Your Accounts</h3>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          Add New Account
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New {paymentMethods.find(m => m.id === selectedMethod)?.name} Account</DialogTitle>
                          <DialogDescription>
                            Enter your account details below to add a new payment option.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="account-name">Account Name</Label>
                            <Input
                              id="account-name"
                              placeholder="Enter account name (e.g., Personal GCash)"
                              value={newAccount.accountName}
                              onChange={(e) => setNewAccount({...newAccount, accountName: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="account-number">Account Number</Label>
                            <Input
                              id="account-number"
                              placeholder="Enter account number"
                              value={newAccount.accountNumber}
                              onChange={(e) => setNewAccount({...newAccount, accountNumber: e.target.value})}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                          <Button onClick={handleAddAccount}>Add Account</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {filteredAccounts.length > 0 ? (
                    <div className="space-y-4">
                      {filteredAccounts.map((account) => (
                        <Card key={account.id} className={`border ${account.isDefault ? 'border-blue-500 bg-blue-50' : ''}`}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <div className="bg-blue-100 p-2 rounded-full">
                                  <CreditCard className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">{account.accountName}</h4>
                                  <p className="text-sm text-gray-600">{account.accountNumber}</p>
                                </div>
                                {account.isDefault && (
                                  <span className="bg-blue-100 text-blue-600 text-xs py-1 px-2 rounded-full">
                                    Default
                                  </span>
                                )}
                              </div>
                              <div className="flex gap-2">
                                {!account.isDefault && (
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleSetDefault(account.id)}
                                  >
                                    Set as Default
                                  </Button>
                                )}
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border-red-200"
                                  onClick={() => handleDeleteAccount(account.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 border rounded-md bg-gray-50">
                      <AlertCircle className="h-10 w-10 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No accounts added yet</h3>
                      <p className="text-gray-500 mb-4">Add your first {paymentMethods.find(m => m.id === selectedMethod)?.name} account to get started</p>
                      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                          <Button>Add an Account</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New {paymentMethods.find(m => m.id === selectedMethod)?.name} Account</DialogTitle>
                            <DialogDescription>
                              Enter your account details below to add a new payment option.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="account-name">Account Name</Label>
                              <Input
                                id="account-name"
                                placeholder="Enter account name (e.g., Personal GCash)"
                                value={newAccount.accountName}
                                onChange={(e) => setNewAccount({...newAccount, accountName: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="account-number">Account Number</Label>
                              <Input
                                id="account-number"
                                placeholder="Enter account number"
                                value={newAccount.accountNumber}
                                onChange={(e) => setNewAccount({...newAccount, accountNumber: e.target.value})}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                            <Button onClick={handleAddAccount}>Add Account</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="bg-blue-50 border-t border-blue-100 flex justify-between">
                <p className="text-sm text-blue-700">
                  <AlertCircle className="h-4 w-4 inline mr-1" />
                  Your payment information is securely stored
                </p>
                <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Sellmate. All rights reserved.
      </footer>
    </div>
  );
};

export default PaymentMethodsPage;
