# HasOffers Admin Panel Guide

This guide explains the new admin panel screens for managing HasOffers postback tracking.

## New Admin Screens

### 1. HasOffers Dashboard (`/admin/hasoffers`)

**Features:**
- Overview statistics for all casinos
- Total conversions, clicks, conversion rate
- Total revenue and payout across all configured casinos
- Active configurations count
- Casino performance comparison table
- Quick action cards for navigation

**Metrics Displayed:**
- Total Conversions
- Total Clicks  
- Conversion Rate
- Total Revenue
- Total Payout
- Active Configurations

**Navigation:**
- Quick links to add new configurations
- Quick links to view conversion details

### 2. HasOffers Configurations (`/admin/hasoffers/configs`)

**Features:**
- List of all HasOffers network configurations
- Casino name, network domain, offer ID
- Conversion count per configuration
- Status indicators (active/inactive/paused)
- Copy postback URL functionality
- Edit and delete actions
- Setup instructions banner

**Table Columns:**
- Casino name
- Network domain
- Offer ID
- Number of conversions
- Status badge
- Postback URL with copy button

**Actions:**
- Add new configuration
- Edit existing configuration
- Delete configuration
- Copy postback URL to clipboard

### 3. New Configuration (`/admin/hasoffers/configs/new`)

**Form Fields:**
- Casino selection (dropdown)
- Network domain (e.g., your-network.go2cloud.org)
- Offer ID (from HasOffers network)
- Postback URL (auto-generated with default)
- Status (active/inactive/paused)
- Notes (optional)

**Features:**
- Auto-generated default postback URL
- Casino dropdown populated from existing casinos
- Setup instructions panel
- Form validation
- Success/error handling

### 4. Edit Configuration (`/admin/hasoffers/configs/edit/[id]`)

**Features:**
- All fields from new configuration
- Casino field disabled (prevents changing casino)
- Shows conversion count for the configuration
- Warning if configuration has active conversions
- Delete functionality with confirmation

**Additional Features:**
- Active tracking indicator if conversions exist
- Warning about modifying network domain/offer ID
- Delete with confirmation dialog

### 5. Conversions Tracking (`/admin/hasoffers/conversions`)

**Features:**
- Casino selection dropdown
- Status filter (pending/approved/rejected)
- Date range filter
- Statistics summary cards
- Conversion data table
- Pagination
- Export button (placeholder)

**Statistics Cards:**
- Total Conversions
- Total Revenue
- Total Payout
- Approval Rate

**Table Columns:**
- Transaction ID
- Offer ID
- Conversion Type
- Payout Amount
- Revenue Amount
- Status Badge
- Conversion Date

**Filters:**
- Casino selection
- Status filter
- Start date
- End date

**Actions:**
- View conversion details
- Previous/Next pagination

## Navigation Structure

The admin sidebar now includes a new "Tracking" section:

```
├── Main
│   ├── Dashboard
│   └── Users
├── Directory
│   ├── Casinos
│   ├── Categories
│   ├── Tags
│   ├── Countries
│   └── Game Types
├── Content
│   ├── Blogs
│   ├── News
│   ├── Reviews
│   └── FAQs
├── Marketing
│   ├── Banners
│   ├── Affiliate Links
│   └── Email Campaigns
├── Tracking (NEW)
│   ├── HasOffers Tracking
│   ├── Configurations
│   └── Conversions
└── System
    ├── Media Library
    ├── Settings
    ├── Activity Logs
    └── Banned Countries
```

## Component Updates

### Enhanced Form Elements
- Added `helperText` prop to Input component for additional guidance
- Added Card, CardHeader, CardTitle, CardContent components for consistent UI

### Enhanced Table Component
- Added `onView` callback for view actions
- Added `showActions` prop to control action column visibility
- Added Eye icon for view actions
- Improved action button grouping

## Usage Workflow

### Setting Up a New Casino for Tracking

1. **Navigate to Configurations**
   - Go to `/admin/hasoffers/configs`

2. **Add New Configuration**
   - Click "Add Configuration"
   - Select the casino
   - Enter network domain (e.g., "network.go2cloud.org")
   - Enter offer ID from HasOffers network
   - Review auto-generated postback URL
   - Save configuration

3. **Configure HasOffers Network**
   - Copy the postback URL from the configuration
   - Log into your HasOffers network dashboard
   - Navigate to the offer settings
   - Add the postback URL
   - Enable required macros: `{transaction_id}`, `{offer_id}`, `{aff_sub}`, `{payout}`, `{sale_amount}`

4. **Monitor Performance**
   - Check dashboard for overview statistics
   - View conversions page for detailed data
   - Filter by casino, status, or date range

### Managing Existing Configurations

1. **View All Configurations**
   - Navigate to `/admin/hasoffers/configs`
   - Review all configured casinos
   - Check status and conversion counts

2. **Edit Configuration**
   - Click edit button on any configuration
   - Modify network domain, offer ID, or status
   - Add or update notes
   - Save changes

3. **Delete Configuration**
   - Click edit button
   - Click delete at the bottom
   - Confirm deletion
   - Configuration and associated data will be removed

### Analyzing Conversion Data

1. **View Dashboard**
   - Go to `/admin/hasoffers`
   - Review overall performance metrics
   - Compare casino performance

2. **Detailed Conversion Analysis**
   - Navigate to `/admin/hasoffers/conversions`
   - Select specific casino
   - Apply filters as needed
   - Review conversion details
   - Export data if needed

## Styling and UI

### Color Scheme
- **Primary**: Indigo (#4F46E5)
- **Success**: Emerald (#10B981)
- **Warning**: Amber (#F59E0B)
- **Danger**: Rose (#EF4444)
- **Info**: Blue (#3B82F6)

### Status Badges
- **Active**: Green background with green text
- **Inactive**: Gray background with gray text
- **Paused**: Amber background with amber text
- **Approved**: Green background with green text
- **Pending**: Amber background with amber text
- **Rejected**: Red background with red text

### Responsive Design
- Mobile-friendly sidebar with toggle
- Responsive tables with horizontal scroll
- Adaptive grid layouts for statistics cards
- Touch-friendly buttons and controls

## API Integration

All screens integrate with the backend API endpoints:

- `/api/admin/hasoffers/configs` - CRUD operations
- `/api/hasoffers/conversions/:casinoId` - Conversion data
- `/api/hasoffers/analytics/:casinoId` - Analytics data
- `/api/admin/casinos` - Casino data for dropdowns

## Future Enhancements

Potential improvements to consider:
- Real-time conversion updates via websockets
- Advanced filtering and search
- Custom date range picker
- Conversion trend charts
- Revenue/payout charts over time
- Export to CSV/Excel
- Conversion details modal
- Bulk actions on conversions
- Fraud detection indicators
- Multi-currency support
- Custom conversion events tracking

## Troubleshooting

### Configurations Not Loading
- Check API connection
- Verify backend is running
- Check browser console for errors

### Conversions Not Showing
- Ensure casino has active configuration
- Check that postback URL is correctly configured in HasOffers network
- Verify date range filters
- Check status filter settings

### Statistics Not Updating
- Refresh the page
- Check API endpoints are responding
- Verify casino has conversion data
- Check browser console for API errors

## Security Considerations

- All admin routes should be protected by authentication
- Postback URLs are public but should be monitored for abuse
- Consider adding rate limiting to postback endpoint
- Implement IP whitelisting if HasOffers network provides fixed IPs
- Regular audit of conversion data for anomalies