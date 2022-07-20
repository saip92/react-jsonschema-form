import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { getSubmitButtonOptions, WidgetProps } from "@rjsf/utils";

const SubmitButton = ({ uiSchema }: WidgetProps) => {
  const {
    submitText,
    norender,
    props: submitButtonProps,
  } = getSubmitButtonOptions(uiSchema);
  if (norender) {
    return null;
  }

  return (
    <Box marginTop={3}>
      <Button type="submit" variant="solid" {...submitButtonProps}>
        {submitText}
      </Button>
    </Box>
  );
};
export default SubmitButton;
