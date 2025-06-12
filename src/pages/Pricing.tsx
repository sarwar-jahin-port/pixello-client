import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import {
  Check as CheckIcon,
  Star as StarIcon,
  Crown as CrownIcon,
  Zap as ZapIcon,
  Shield as ShieldIcon
} from 'lucide-react';
import { paymentService } from '../services/api';

const PricingCard = styled(Card)(({ theme, featured }) => ({
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  border: featured ? `2px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.divider}`,
  transform: featured ? 'scale(1.05)' : 'scale(1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: featured ? 'scale(1.08)' : 'scale(1.02)',
    boxShadow: theme.shadows[8],
  },
}));

const FeaturedBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: -12,
  left: '50%',
  transform: 'translateX(-50%)',
  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: theme.palette.common.white,
  padding: theme.spacing(0.5, 2),
  borderRadius: 20,
  fontSize: 12,
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  gap: 4,
}));

const PriceText = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  fontWeight: 700,
  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const CheckoutForm = ({ open, onClose, selectedPlan }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    transactionAmount: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      console.log(formData);
      formData.transactionAmount = selectedPlan?.price;
      const response = await paymentService.payment(formData)
      
      if(response.payment_url){
        window.location.href = response.payment_url;
      }
    } catch (error) { 
      console.error(error);
    }
  };

  const isFormValid = formData.name && formData.email && formData.phone && formData.address;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h5" fontWeight={600}>
          Complete Your Purchase
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {selectedPlan?.name} Plan - ${selectedPlan?.price}/month
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid size={12}>
              <Alert severity="info" sx={{ mb: 2 }}>
                Please fill in your details to proceed to payment
              </Alert>
            </Grid>
            <Grid size={12}> 
              <TextField
                fullWidth
                label="Full Name"
                value={formData.name}
                onChange={handleInputChange('name')}
                required
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                required
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Phone Number"
                value={formData.phone}
                onChange={handleInputChange('phone')}
                required
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Street Address"
                value={formData.address}
                onChange={handleInputChange('address')}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isFormValid || loading}
            sx={{ minWidth: 120 }}
          >
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const Pricing = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 9,
      description: 'Perfect for individuals getting started',
      icon: <StarIcon size={24} />,
      features: [
        'Up to 5 posts per day',
        'Basic analytics',
        'Standard support',
        '1 social account',
        'Mobile app access',
        'Basic templates'
      ],
      buttonText: 'Get Started',
      featured: false
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 29,
      description: 'Best for growing businesses and teams',
      icon: <ZapIcon size={24} />,
      features: [
        'Unlimited posts',
        'Advanced analytics',
        'Priority support',
        'Up to 10 social accounts',
        'Team collaboration',
        'Custom templates',
        'Scheduling tools',
        'Content calendar'
      ],
      buttonText: 'Start Free Trial',
      featured: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99,
      description: 'For large organizations with advanced needs',
      icon: <CrownIcon size={24} />,
      features: [
        'Everything in Pro',
        'White-label solution',
        'Dedicated account manager',
        'Unlimited social accounts',
        'Advanced integrations',
        'Custom reporting',
        'API access',
        'SLA guarantee'
      ],
      buttonText: 'Contact Sales',
      featured: false
    }
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setCheckoutOpen(true);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h2" fontWeight={700} sx={{ mb: 2 }}>
            Choose Your Plan
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Unlock the full potential of your social media presence with our flexible pricing plans
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
            <ShieldIcon size={20} color={theme.palette.success.main} />
            <Typography variant="body2" color="text.secondary">
              30-day money-back guarantee • Cancel anytime • No setup fees
            </Typography>
          </Box>
        </motion.div>
      </Box>

      <Grid container spacing={4} sx={{ mb: 8 }}>
        {plans.map((plan, index) => (
          <Grid size={{xs:12, md:4}} key={plan.id}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <PricingCard featured={plan.featured}>
                {plan.featured && (
                  <FeaturedBadge>
                    <StarIcon size={14} />
                    Most Popular
                  </FeaturedBadge>
                )}
                
                <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Box sx={{ 
                      display: 'inline-flex', 
                      p: 2, 
                      borderRadius: '50%', 
                      bgcolor: plan.featured ? 'primary.main' : 'grey.100',
                      color: plan.featured ? 'white' : 'primary.main',
                      mb: 2
                    }}>
                      {plan.icon}
                    </Box>
                    <Typography variant="h4" fontWeight={600} sx={{ mb: 1 }}>
                      {plan.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      {plan.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', mb: 1 }}>
                      <Typography variant="h6" color="text.secondary">$</Typography>
                      <PriceText>{plan.price}</PriceText>
                      <Typography variant="body1" color="text.secondary">/month</Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      Billed monthly
                    </Typography>
                  </Box>

                  <List sx={{ flexGrow: 1, py: 0 }}>
                    {plan.features.map((feature, featureIndex) => (
                      <ListItem key={featureIndex} sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckIcon size={16} color={theme.palette.success.main} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={feature}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Button
                    variant={plan.featured ? 'contained' : 'outlined'}
                    color="primary"
                    size="large"
                    fullWidth
                    sx={{ mt: 3, py: 1.5 }}
                    onClick={() => handlePlanSelect(plan)}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </PricingCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'center', py: 6, bgcolor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
          Need a custom solution?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Contact our sales team for enterprise pricing and custom features
        </Typography>
        <Button variant="outlined" color="primary" size="large">
          Contact Sales
        </Button>
      </Box>

      <CheckoutForm
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        selectedPlan={selectedPlan}
      />
    </Container>
  );
};

export default Pricing;