import { css, styled } from "@vivid-planet/react-admin-mui";
/* tslint:disable */
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
/* tslint:enable */

interface IDateRangePickerWrapperProps {
    fullWidth: boolean;
    color: "primary" | "secondary" | "default";
}

export const DateRangePickerWrapper = styled.div<IDateRangePickerWrapperProps>`
    * {
        font: inherit;
    }

    ${({ fullWidth }) =>
        fullWidth &&
        css`
            .DateRangePicker,
            .DateRangePickerInput {
                display: block;
            }
        `};

    .DateInput {
        position: static;
    }

    .DateRangePickerInput_clearDates__small {
        display: flex;
    }

    .DateRangePickerInput_clearDates_default:hover {
        background: unset;
    }

    .DayPickerNavigation_button__default {
        border: none;
    }

    td.CalendarDay {
        border: none;
        margin: 5px;
        border-radius: 50%;

        :hover {
            border: none;
            border-radius: 50%;

            ${({ theme, color }) =>
                color === "primary" || color === "secondary"
                    ? css`
                          background-color: ${theme.palette[color].light};
                          color: ${theme.palette[color].contrastText};
                      `
                    : css`
                          background-color: ${theme.palette.grey["200"]};
                          color: ${theme.palette.grey["700"]};
                      `};
        }

        &__selected {
            &_start,
            &_end {
                ${({ theme, color }) =>
                    color === "primary" || color === "secondary"
                        ? css`
                              background: ${theme.palette[color].dark};
                              color: ${theme.palette[color].contrastText};

                              :hover {
                                  background: ${theme.palette[color].light};
                              }
                          `
                        : css`
                              background-color: ${theme.palette.grey["500"]};
                              color: white;

                              :hover {
                                  background-color: ${theme.palette.grey["400"]};
                                  color: white;
                              }
                          `};
            }

            &_span {
                ${({ theme, color }) =>
                    color === "primary" || color === "secondary"
                        ? css`
                              background: ${theme.palette[color].main};
                              color: ${theme.palette[color].contrastText};

                              :hover {
                                  background: ${theme.palette[color].light};
                              }
                          `
                        : css`
                              background-color: ${theme.palette.grey["300"]};
                              color: ${theme.palette.grey["700"]};

                              :hover {
                                  background-color: ${theme.palette.grey["200"]};
                                  color: ${theme.palette.grey["700"]};
                              }
                          `};
            }
        }

        &__hovered_span {
            ${({ theme, color }) =>
                color === "primary" || color === "secondary"
                    ? css`
                          background-color: ${theme.palette[color].light};
                          color: ${theme.palette[color].contrastText};
                      `
                    : css`
                          background-color: ${theme.palette.grey["200"]};
                          color: ${theme.palette.grey["700"]};
                      `};
        }
    }
`;
