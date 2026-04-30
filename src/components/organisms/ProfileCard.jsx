import { Card, CardContent } from '@mui/material';
import ProfileSummary from '../molecules/ProfileSummary.jsx';

function ProfileCard({ user }) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: '1px solid rgba(15, 23, 42, 0.08)',
      }}
    >
      <CardContent>
        <ProfileSummary user={user} />
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
