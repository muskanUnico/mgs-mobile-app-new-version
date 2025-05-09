import { useState } from "react";

//interface
import { TeamMemberService } from "../../../services/TeamMember/TeamMember";
import { navigate } from "../../../utils/navigationServices";

export const updateStaffHours = (memberId: string) => {
  const [loading, setLoading] = useState<boolean>(false);

  const submit = (body: object) => {
    setLoading(true);

    TeamMemberService.updateStaffHours(memberId, body)
      .catch((err) => {
        // alert(err.response?.data?.message || "An error occurred");
      })
      .then((res) => {
        if (res?.success) {
          navigate("AllTeamMember");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { submit, loading };
};
