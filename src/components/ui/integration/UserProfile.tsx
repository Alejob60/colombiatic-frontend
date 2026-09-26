import React from 'react';
import { User, Mail, Calendar, Building, LogOut } from 'lucide-react';

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    company?: string;
    joinDate: string;
    plan: string;
  };
  onLogout?: () => void;
  className?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  user,
  onLogout,
  className = ''
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`bg-[#1A2633] border border-[rgba(255,255,255,0.07)] rounded-xl overflow-hidden ${className}`}>
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00C2FF] flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#E6EDF3]">{user.name}</h2>
            <p className="text-[#3BA5FF] font-medium">{user.plan}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-[#94A3B8]" />
            <div>
              <p className="text-sm text-[#94A3B8]">Email</p>
              <p className="text-[#E6EDF3]">{user.email}</p>
            </div>
          </div>
          
          {user.company && (
            <div className="flex items-center gap-3">
              <Building className="w-5 h-5 text-[#94A3B8]" />
              <div>
                <p className="text-sm text-[#94A3B8]">Empresa</p>
                <p className="text-[#E6EDF3]">{user.company}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-[#94A3B8]" />
            <div>
              <p className="text-sm text-[#94A3B8]">Miembro desde</p>
              <p className="text-[#E6EDF3]">{formatDate(user.joinDate)}</p>
            </div>
          </div>
        </div>
      </div>
      
      {onLogout && (
        <div className="px-6 py-4 bg-[#334155]/50 border-t border-[rgba(255,255,255,0.07)]">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-lg font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;